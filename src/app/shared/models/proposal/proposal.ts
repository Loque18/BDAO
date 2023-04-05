type Proposal = {
	number: number;
	description: string;
	title: string;
	status: number;
};

type Vote = {
	address: string;
	signature: string;
	weight: number;
	vote: number;
};

type DetailedProposal = {
	number: number;
	againstVotes: number;
	abstainVotes: number;
	withVotes: number;
	againstVotingWeight: number;
	abstainVotingWeight: number;
	withVotingWeight: number;
	description: string;
	creationgTime: number;
	votes: Vote[];
	title: string;
	status: number;
};

export { Proposal, DetailedProposal, Vote };
