import Web3 from 'web3';

import { Contract } from 'web3-eth-contract';

class Web3Wrapper {
	constructor(
		public web3Instance: Web3 | null = null,
		public initialized: boolean = false, // public readOnlyInitialized: boolean = false
		public web3ROInstances: {
			[key: string]: Web3;
		} = {},
		public web3ROInitialized: boolean = false,
		public contracts: {
			[key: string]: Contract;
		} = {}
	) {}

	public setWeb3Instance(web3: Web3): void {
		this.web3Instance = web3;
	}

	public removeWeb3Instance(): void {
		this.web3Instance = null;
	}

	public setInitialized(initialized: boolean): void {
		this.initialized = initialized;
	}

	public addWeb3ROInstance(instanceKey: string, web3: Web3): void {
		this.web3ROInstances = {
			...this.web3ROInstances,
			[instanceKey]: web3,
		};
	}

	public removeWeb3ROInstance(instanceKey: string): void {
		const { [instanceKey]: _, ...web3ROInstances } = this.web3ROInstances;

		this.web3ROInstances = web3ROInstances;
	}

	public setWeb3ROInitialized(web3ROInitialized: boolean): void {
		this.web3ROInitialized = web3ROInitialized;
	}

	public addContract(scKey: string, contract: Contract): void {
		this.contracts = {
			...this.contracts,
			[scKey]: contract,
		};
	}

	public removeContract(scKey: string): void {
		const { [scKey]: _, ...contracts } = this.contracts;

		this.contracts = contracts;
	}
}

export { Web3Wrapper };
