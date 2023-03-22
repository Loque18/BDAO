import { Reward } from './reward';

type StakingStats = {
	activeStaked: number;
	spots: number;
	totalProfit: number;
	totalStaked: number;
	rewardsHistory: Reward[];
};

export { StakingStats };
