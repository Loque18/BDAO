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

// PROPOSALS DETAIL

type SuccessProposalResponse = {
	success: true;
	data: DetailedProposal;
	statusCode: number;
};

type ErrorProposalResponse = {
	success: false;
	message: string;
	statusCode: number;
};

type ProposalResponse = SuccessProposalResponse | ErrorProposalResponse;

// VOTE PROPOSAL
type SuccessVoteResponse = {
	success: true;
	message: string;
	statusCode: number;
};

type FailedVoteResponse = {
	success: false;
	message: string;
	statusCode: number;
};

type VoteResponse = SuccessVoteResponse | FailedVoteResponse;

export { TreasuryResponse, StakingResponse, AllProposalsResponse, ProposalResponse, VoteResponse };
