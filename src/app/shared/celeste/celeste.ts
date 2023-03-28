/* eslint-disable @typescript-eslint/no-explicit-any */

import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';
import { MetaMaskInpageProvider } from '@metamask/providers';

import { Rpc, Web3Config, ProviderType } from './celeste-types';

import { WalletData } from './wallet-data';
import { Web3Wrapper } from './we3-wrapper';

import { providers, EthEvents } from './constants';

// import type EthereumProvider from '@walletconnect/ethereum-provider/dist/types/EthereumProvider';
import { environment } from 'src/environments/environment';
import { ProviderContext } from './provider-context';

import { type IProviderStrategy } from './provider-context/strategies/IProviderStrategy';
import { InjectedProviderStrategy } from './provider-context/strategies/injected';
import { LinkedProviderStrategy } from './provider-context/strategies/linked';
import { ICeleste } from '../models/iceleste';

import { SmartContract } from './celeste-types';

// instantiate strategies
const StrategiesMap: {
	[key: string]: IProviderStrategy;
} = {
	[providers.INJECTED]: new InjectedProviderStrategy(),
	[providers.LINKED]: new LinkedProviderStrategy(),
};

export class Celeste implements ICeleste {
	// *~~*~~*~~ External variables ~~*~~*~~* //

	private _config!: Web3Config; // config object
	private _ready: boolean = false; // is celeste ready to be used
	private _web3Wrapper: Web3Wrapper = new Web3Wrapper(); // web3 instanecs
	private _walletData: WalletData = new WalletData(); // wallet data
	private _events: any = {}; // events

	get ready(): boolean {
		return this._ready;
	}

	get walletData(): WalletData {
		return this._walletData;
	}

	get web3Wrapper(): Web3Wrapper {
		return this._web3Wrapper;
	}

	// private _web3WrapperSub: BehaviorSubject<Web3Wrapper> = new BehaviorSubject<Web3Wrapper>(
	// 	this._web3Wrapper
	// );
	// public web3Wrapper$: Observable<Web3Wrapper> = this._web3WrapperSub.asObservable();

	// *~~*~~*~~ Internal variables ~~*~~*~~* //

	// create new provider context with injected strategy as default
	private _providerContext: ProviderContext = new ProviderContext(
		StrategiesMap[providers.INJECTED]
	);

	private _providerInstances: {
		injected: MetaMaskInpageProvider | undefined;
		linked: any | undefined;
	} = {
		injected: undefined,
		linked: undefined,
	};

	// init(_config: Web3Config): void {
	// 	this._initWeb3(_config).then(() => {
	// 		this._ready = true;
	// 	});
	// }

	public async init(config: Web3Config): Promise<void> {
		this._config = config;
		const { rpcs: rpcsObj, smartContracts, isMultichain } = config;

		const rpcs: Rpc[] = Object.values(rpcsObj);

		// 1. init strategies
		const injectedStrategy = StrategiesMap[providers.INJECTED];
		const linkedStrategy = StrategiesMap[providers.LINKED];

		// 2. create web3 readonly instances, for each rpc and init its smart contracts

		if (!isMultichain && rpcs.length > 1) {
			throw new Error('Multichain is not enabled but more than one rpc is provided');
		}

		rpcs.forEach((rpc: Rpc) => {
			const web3 = new Web3(rpc.url);

			this._web3Wrapper.addWeb3ROInstance(rpc.name, web3); // add web3 instance

			// get the smart contracts for the current rpc (multichain)
			let sc: SmartContract[] = [];
			if (!isMultichain) {
				sc = smartContracts;
			} else {
				sc = smartContracts.filter((sc: SmartContract) =>
					Object.keys(sc.address).includes(rpc.chainId.toString())
				);
			}

			sc.forEach((sc: SmartContract) => {
				const address = isMultichain ? sc.address[rpc.chainId] : (sc.address as string);

				const _scInstance = new web3.eth.Contract(sc.abi as AbiItem, address);

				const scKey = `${sc.key}_READ.${rpc.chainId}`;

				this._web3Wrapper.addContract(scKey, _scInstance);
			});
		});

		this._web3Wrapper.setWeb3ROInitialized(true);

		// 3. intantiante providers
		// get injected provider
		try {
			await injectedStrategy.init(rpcs);
			this._providerInstances.injected =
				injectedStrategy.getProvider() as MetaMaskInpageProvider;
		} catch (e) {
			if (environment.development) console.warn('Injected provider not found');
		}

		// get linked provider
		try {
			await linkedStrategy.init(rpcs);
			this._providerInstances.linked = linkedStrategy.getProvider();
		} catch (e) {
			if (environment.development) console.warn('Linked provider not found');
		}

		// 4. listen for provider events
		this._listenForProviderEvents();

		// 5. try recovering any existing session
		await this.getPreviousSession();

		// 6. set ready flag
		this._ready = true;
	}

	/**
	 * Try to recover previous session,
	 * the session restored will be the first one found
	 * in the following order: injected, linked
	 */
	private async getPreviousSession(): Promise<void> {
		// const listOfProviders = [providers.INJECTED];

		type _Session = {
			providerType: ProviderType;
			accounts: string[];
		};

		// injected
		this._providerContext.setStrategy(StrategiesMap[providers.INJECTED]);
		const injectedSession: _Session = {
			providerType: providers.INJECTED,
			accounts: await this._providerContext.getPreviosSession(),
		};

		// linked
		this._providerContext.setStrategy(StrategiesMap[providers.LINKED]);
		const linkedSession: _Session = {
			providerType: providers.LINKED,
			accounts: await this._providerContext.getPreviosSession(),
		};

		const s = [injectedSession, linkedSession].find((s) => s.accounts.length > 0);

		if (s) {
			await this.storeWalletData(s.providerType, this._providerInstances[s.providerType]);
		}
	}

	// *~~*~~*~~ Wallet Methods ~~*~~*~~* //

	/**
	 *
	 * @param providerType provider type to connect to
	 * @returns an observable that emits the connection result
	 */
	public async requestConnection(providerType: ProviderType): Promise<void> {
		if (this._walletData.isLoggedIn) return;

		this._providerContext.setStrategy(StrategiesMap[providerType]);

		await this._providerContext.requestConnection();

		await this.storeWalletData(providerType, this._providerInstances[providerType]);
	}

	public async requestDisconnection(): Promise<void> {
		if (!this._walletData.isLoggedIn) return; // if user is not logged in, do nothing

		this._providerContext.setStrategy(StrategiesMap[this._walletData.provider as ProviderType]);

		await this._providerContext.requestDisconnection();

		this.removeWalletData();
	}

	/*
	public signMessage(message: string): Observable<unknown> {
		if (!this._walletData.isLoggedIn)
			return throwError(() => new Error('User is not logged in'));
		const type = this._walletData.provider as ProviderType;

		const provider = this._providerInstances[type];

		if (!provider) return throwError(() => new Error('Provider not found'));

		const obs = from(
			provider.request({
				method: 'personal_sign',
				params: [message, this._walletData.address],
			})
		);
		return obs;
	}
	*/

	// *~~*~~*~~ Web3 Events ~~*~~*~~* //

	private _listenForProviderEvents(): void {
		const injectedProvider: MetaMaskInpageProvider | undefined =
			this._providerInstances.injected;

		const wcProvider: any | undefined = this._providerInstances.linked;

		if (injectedProvider) {
			injectedProvider.removeAllListeners();

			injectedProvider.on('accountsChanged', (accounts) => {
				const acc: string[] = accounts as string[];

				this.accountsChanged(acc);
			});

			injectedProvider.on('chainChanged', (chainId) => {
				const chainId_decimal = parseInt(chainId as string, 16);

				this.chainChanged(chainId_decimal);
			});

			// injectedProvider.on('disconnect', () => {
			//     // this.disconnect();
			// });
		}

		if (wcProvider) {
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			wcProvider.removeListener('accountsChanged', () => {});
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			wcProvider.removeListener('chainChanged', () => {});
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			wcProvider.removeListener('disconnect', () => {});

			wcProvider.on('accountsChanged', (acc: string[]) => {
				this.accountsChanged(acc);
			});

			wcProvider.on('chainChanged', (chainId: string) => {
				const chainIdNum: number = parseInt(chainId);
				this.chainChanged(chainIdNum);
			});

			wcProvider.on('disconnect', (stream: any) => {
				const { code, message } = stream;

				if (code === 6000) {
					this.accountsChanged([]);
				} else {
					// eslint-disable-next-line no-console
					if (environment.development)
						console.error('Wallet connect disconnected', code, message);

					this.accountsChanged([]);
				}
			});
		}
	}

	accountsChanged(accounts: string[]): void {
		if (!(accounts.length > 0)) {
			this.removeWalletData();
		} else {
			if (!this._walletData.isLoggedIn) return;

			this._walletData.setAddress(accounts[0]);
			// celesteStore.dispatch(set_address(accounts[0]));
		}
	}

	chainChanged(chainId: number): void {
		if (!this._walletData.isLoggedIn) return;

		this._walletData.setChainId(chainId);
	}

	on(eventkey: EthEvents, callback: (data: any) => void): void {
		this._events[eventkey] = callback;
	}

	// *~~*~~*~~ Utility Methods ~~*~~*~~* //

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private async storeWalletData(providerType: ProviderType, provider: any): Promise<void> {
		const _web3: Web3 = new Web3(provider);
		const chainId: number = await _web3.eth.getChainId();
		const addresses: string[] = await _web3.eth.getAccounts();
		const address: string = addresses[0];
		const loggedIn: boolean = true;

		const walletData: WalletData = new WalletData(address, chainId, providerType, loggedIn);

		this._walletData = walletData;

		this._web3Wrapper.setWeb3Instance(_web3);
		this._web3Wrapper.setInitialized(true);

		// intantiate write smart contracts
		let sc: SmartContract[] = [];

		if (!this._config.isMultichain) {
			sc = this._config.smartContracts;
		} else {
			// check address for chainId is defined
			sc = this._config.smartContracts.filter((sc: SmartContract) =>
				Object.keys(sc.address).includes(chainId.toString())
			);
		}

		sc.forEach((sc: SmartContract) => {
			const address = this._config.isMultichain
				? sc.address[chainId]
				: (sc.address as string);

			const contract: Contract = new _web3.eth.Contract(sc.abi as AbiItem, address);

			this._web3Wrapper.addContract(sc.key, contract);
		});

		// if(this._config.isMultichain) {
		// sc = this._config.smartContracts.filter((sc: SmartContract) => sc.address[chainId] === );

		// this.initSmartContracts(_web3, this._config.smartContracts.filter((sc: SmartContract) => sc.cha)

		localStorage.setItem('celeste_session', '_');
		// this._web3Subject.next(this._web3Wrapper);
	}

	private removeWalletData(): void {
		this._walletData.reset();

		this._web3Wrapper.removeWeb3Instance();
		this._web3Wrapper.setInitialized(false);
		// this._web3WrapperSub.next(this._web3Wrapper);

		// remove all write smart contracts
		const contracts = this._web3Wrapper.contracts;

		Object.keys(contracts).forEach((key: string) => {
			if (key.includes('_READ')) return;
			this._web3Wrapper.removeContract(key);
		});

		localStorage.removeItem('celeste_session');
	}
}
