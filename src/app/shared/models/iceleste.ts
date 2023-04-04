/* eslint-disable @typescript-eslint/no-explicit-any */
import { EventEmitter } from '@angular/core';
import { Web3Config } from '../celeste/celeste-types';
import { EthEvents } from '../celeste/constants';
import { WalletData } from '../celeste/wallet-data';
import { Web3Wrapper } from '../celeste/we3-wrapper';

interface ICeleste {
	ready: boolean;
	walletData: WalletData;
	web3Wrapper: Web3Wrapper;

	connectEvent: EventEmitter<null>;
	disconnectEvent: EventEmitter<null>;

	init(config: Web3Config): Promise<void>;

	requestConnection(providerType: 'injected' | 'linked'): Promise<void>;
	requestDisconnection(): Promise<void>;
	sign(message: string): Promise<unknown>;

	on(eventkey: EthEvents, callback: (data: any) => void): void;
}

export { ICeleste };
