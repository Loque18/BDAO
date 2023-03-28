import { ProviderType } from '../celeste-types';

const providers: {
	INJECTED: ProviderType;
	LINKED: ProviderType;
} = {
	INJECTED: 'injected',
	LINKED: 'linked',
};

enum EthEvents {
	ACCOUNTS_CHANGED = 'accountsChanged',
	CHAIN_CHANGED = 'chainChanged',
	DISCONNECT = 'disconnect',
}

export { providers, EthEvents };
