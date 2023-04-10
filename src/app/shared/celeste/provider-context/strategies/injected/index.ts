import { MetaMaskInpageProvider } from '@metamask/providers/dist/MetaMaskInpageProvider';

import { IProviderStrategy } from '../IProviderStrategy';

class InjectedProviderStrategy implements IProviderStrategy {
	protected provider!: MetaMaskInpageProvider;

	init(): void {
		const injected = window.ethereum;

		if (!injected) {
			throw new Error('No injected provider found');
		}

		this.provider = injected;
	}

	getProvider(): MetaMaskInpageProvider | null {
		return this.provider;
	}

	requestConnection(): Promise<unknown> | void {
		if (!this.provider) {
			window.open('https://metamask.io/', '_blank');
			return;
		}

		return this.provider.request({ method: 'eth_requestAccounts' });
	}

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	requestDisconnection(): void {}

	requestChangeNetwork(network: number): void | Promise<unknown> {
		if (!this.provider) return;

		const chain = `0x${network.toString(16)}`;

		console.log(chain);

		return this.provider.request({
			method: 'wallet_switchEthereumChain',
			params: [{ chainId: chain }],
		});
	}

	async getPreviosSession(): Promise<string[]> {
		if (!this.provider) return [];

		const accounts = await this.provider.request({ method: 'eth_accounts' });
		return accounts as string[];
	}
}

export { InjectedProviderStrategy };
