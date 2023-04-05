import { Reward } from './reward';

type StakingStats = {
	activeStaked: number;
	spots: number;
	totalProfit: number;
	inactiveStaked: number;
	rewardsHistory: Reward[];
	apr: number;
};

export { StakingStats };
