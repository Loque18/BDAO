import { Web3Config } from '../celeste/celeste-types';
import { WalletData } from '../celeste/wallet-data';

interface ICeleste {
	ready: boolean;
	walletData: WalletData;

	init(_config: Web3Config): void;

	requestConnection(providerType: 'injected' | 'linked'): Promise<void>;
	requestDisconnection(): Promise<void>;
}

export { ICeleste };
