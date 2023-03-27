type Rpc = {
	name: string;
	chainId: number;
	url: string;
	explorer: string;
};

type SmartContract = {
	key: string;
	abi: {};
	address: string | { [chainId: number]: string };
};

type Web3Config = {
	isMultichain: boolean;

	rpcs: {
		// at least one
		[rpcName: string]: Rpc;
	};

	smartContracts: SmartContract[];

	addressBook: {
		[addressKey: string]: string;
	};
};

type ProviderType = 'injected' | 'linked';

export { Rpc, Web3Config, ProviderType, SmartContract };
