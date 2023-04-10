// import type EthereumProviderT from '@walletconnect/ethereum-provider/dist/types/EthereumProvider';
// import { EthereumProvider } from '@walletconnect/ethereum-provider';

import { IProviderStrategy } from '../IProviderStrategy';

import { Rpc } from '../../../celeste-types';
import { environment } from 'src/environments/environment';
// import EthereumProvider from '@walletconnect/ethereum-provider';

// import { EthereumProvider } from '@walletconnect/ethereum-provider';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { EthereumProvider } = require('@walletconnect/ethereum-provider');

class LinkedProviderStrategy implements IProviderStrategy {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	protected provider: any | null = null;

	async init(rpcs: Rpc[]): Promise<void> {
		try {
			this.provider = await EthereumProvider.init({
				projectId: environment.wcProjectId,
				chains: [1, 56],
			});
		} catch (e) {
			if (environment.development)
				console.error('CelesteJS: error initializing linked eth provider', e);
		}
	}

	getProvider(): unknown | null {
		return this.provider;
	}

	requestConnection(): Promise<unknown> | void {
		return this.provider?.enable();
	}

	requestDisconnection(): Promise<void> | void {
		return this.provider?.disconnect();
	}

	requestChangeNetwork(): void | Promise<unknown> {
		//
	}

	async getPreviosSession(): Promise<string[]> {
		if (!this.provider || this.provider.accounts.length === 0) {
			return [];
		}

		// return provider;
		return this.provider.enable();
	}
}

export { LinkedProviderStrategy };
