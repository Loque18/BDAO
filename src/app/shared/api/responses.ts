import { Asset } from '../models/asset';
import { Proposal } from '../models/proposal/proposal';

import { Reward } from '../models/staking/reward';

type ApiResponse = {
	success: boolean;
	statusCode: number;
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

type AllProposalsResponse = ApiResponse & {
	data?: Proposal[];
};

type ProposalReponse = ApiResponse & {
	data?: {
		number: number;
		againstVotes: number;
		againstVotingWeight: number;
		absentVotes: number;
		withVotes: number;
		description: string;
		creationgTime: number;
		votes: [];
		title: string;
		abstainVotingWeight: number;
		status: string;
	};
};

export { TreasuryResponse, StakingResponse, AllProposalsResponse, ProposalReponse };
