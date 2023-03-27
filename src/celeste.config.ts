import { Web3Config } from './app/shared/celeste/celeste-types';

// import abis
import { abi as stakingAbi } from './app/shared/abi/staking';
import { abi as erc20Abi } from './app/shared/abi/erc20';

const config: Web3Config = {
	isMultichain: false,

	rpcs: {
		// eth: {
		// 	url: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
		// 	chainId: 1,
		// 	name: 'Ethereum',
		// 	explorer: 'https://etherscan.io',
		// },
		// bsc: {
		// 	url: 'https://bsc-dataseed.binance.org/',
		// 	chainId: 56,
		// 	name: 'BSC',
		// 	explorer: 'https://bscscan.com',
		// },
		// polygon: {
		// 	url: 'https://polygon-rpc.com/',
		// 	chainId: 137,
		// 	name: 'Polygon',
		// 	explorer: 'https://polygonscan.com',
		// },
		// eth: {
		// 	// url: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
		// 	url: 'https://goerli.infura.io/v3/b6bf7d3508c941499b10025c0776eaf8',
		// 	chainId: 5,
		// 	name: 'Ethereum',
		// 	explorer: 'https://goerli.etherscan.io',
		// },

		bsc: {
			// url: 'https://bsc-dataseed.binance.org/',
			url: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
			chainId: 97,
			name: 'BSC',
			explorer: 'https://testnet.bscscan.com',
		},

		// polygon: {
		// 	url: 'https://rpc-mumbai.maticvigil.com',
		// 	chainId: 80001,
		// 	name: 'Polygon',
		// 	explorer: 'https://mumbai.polygonscan.com',
		// },
	},

	smartContracts: [
		{
			key: 'STAKING',
			abi: stakingAbi,
			address: '0xe1ca6100E35Ad492DCa8654cc27057E88b994769',
		},
		{
			key: 'BRICKS',
			abi: erc20Abi,
			address: '0x1AAeE4aB99ae547B3C74A21f378D467f6b90e0ea',
		},
	],

	addressBook: {
		bricks: '0x1AAeE4aB99ae547B3C74A21f378D467f6b90e0ea',
		staking: '0xe1ca6100E35Ad492DCa8654cc27057E88b994769',
	},
};

export { config };
