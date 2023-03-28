/* eslint-disable @typescript-eslint/no-explicit-any */
import { EthEvents } from './constants';

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

type EthEventHandlers = {
	[EthEvents.CHAIN_CHANGED]?: (chainId: number) => void;
	[EthEvents.ACCOUNTS_CHANGED]?: (accounts: string[]) => void;
	[EthEvents.DISCONNECT]?: (args: any) => void;
};

export { Rpc, Web3Config, ProviderType, SmartContract, EthEventHandlers };
