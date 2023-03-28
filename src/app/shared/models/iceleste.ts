/* eslint-disable @typescript-eslint/no-explicit-any */
import { Web3Config } from '../celeste/celeste-types';
import { EthEvents } from '../celeste/constants';
import { WalletData } from '../celeste/wallet-data';
import { Web3Wrapper } from '../celeste/we3-wrapper';

interface ICeleste {
	ready: boolean;
	walletData: WalletData;
	web3Wrapper: Web3Wrapper;

	init(config: Web3Config): Promise<void>;

	requestConnection(providerType: 'injected' | 'linked'): Promise<void>;
	requestDisconnection(): Promise<void>;

	on(eventkey: EthEvents, callback: (data: any) => void): void;
}

export { ICeleste };
