const abi = [
	{
		inputs: [{ internalType: 'address', name: 'bricksAddress', type: 'address' }],
		stateMutability: 'nonpayable',
		type: 'constructor',
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'address', name: 'user', type: 'address' },
			{ indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
			{ indexed: false, internalType: 'uint256', name: 'time', type: 'uint256' },
		],
		name: 'Stake',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'address', name: 'user', type: 'address' },
			{ indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
		],
		name: 'Unstake',
		type: 'event',
	},
	{
		inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
		name: 'stake',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
		name: 'unstake',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
];

export { abi };
