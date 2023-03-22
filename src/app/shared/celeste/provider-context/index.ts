import { IProviderStrategy } from './strategies/IProviderStrategy';
import { Rpc } from '../celeste-types';

// import type EthereumProvider from '@walletconnect/ethereum-provider/dist/types/EthereumProvider';
import { MetaMaskInpageProvider } from '@metamask/providers';

// import EthereumProvider from '@walletconnect/ethereum-provider/dist/types/EthereumProvider';

class ProviderContext {
	private _strategy: IProviderStrategy;

	constructor(strategy: IProviderStrategy) {
		this._strategy = strategy;
	}

	public setStrategy(strategy: IProviderStrategy): void {
		this._strategy = strategy;
	}

	// *~~*~~*~~ interface methods *~~*~~*~~* //

	getProvider(): MetaMaskInpageProvider | unknown | null {
		return this._strategy.getProvider();
	}

	requestConnection(): Promise<unknown> | void {
		return this._strategy.requestConnection();
	}

	requestDisconnection(): Promise<unknown> | void {
		return this._strategy.requestDisconnection();
	}

	getPreviosSession(): Promise<string[]> {
		return this._strategy.getPreviosSession();
	}
}

export { ProviderContext };
