import { Asset } from '../models/asset';

import { Reward } from '../models/staking/reward';

type ApiResponse = {
	success: boolean;
	statusCode: number;
	data?: {};
	message?: string;
};

type TreasuryResponse = ApiResponse & {
	data?: {
		properties: Asset[];
		crypto: Asset[];
	};
};

type StakingResponse = ApiResponse & {
	data?: {
		rewardsHistory: Reward[];
		totalProfit: number;
		spots: number;
		activeStaked: number;
		totalStaked: number;
	};
};

export { TreasuryResponse, StakingResponse };
