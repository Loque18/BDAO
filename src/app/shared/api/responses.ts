import { Asset } from '../models/asset';
import { DetailedProposal, Proposal } from '../models/proposal/proposal';

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
		apr: number;
		price: number;
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

type SuccessProposalResponse = {
	success: true;
	data: DetailedProposal;
	// {
	// 	number: number;
	// 	againstVotes: number;
	// 	againstVotingWeight: number;
	// 	absentVotes: number;
	// 	withVotes: number;
	// 	description: string;
	// 	creationgTime: number;
	// 	votes: [];
	// 	title: string;
	// 	abstainVotingWeight: number;
	// 	status: string;
	// };
	statusCode: number;
};

type ErrorProposalResponse = {
	success: false;
	message: string;
	statusCode: number;
};

type ProposalResponse = SuccessProposalResponse | ErrorProposalResponse;

export { TreasuryResponse, StakingResponse, AllProposalsResponse, ProposalResponse };
