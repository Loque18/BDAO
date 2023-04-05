import { Asset } from '../models/asset';
import { DetailedProposal, Proposal } from '../models/proposal/proposal';

import { Reward } from '../models/staking/reward';
import { StakingStats } from '../models/staking/stats';

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

// Proposals

type FailedStakingResponse = {
	success: false;
	message: string;
	statusCode: number;
};

type SuccessStakingResponse = {
	success: true;
	statusCode: number;
	data: StakingStats;
};

type StakingResponse = SuccessStakingResponse | FailedStakingResponse;

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
