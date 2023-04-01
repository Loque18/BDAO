type Proposal = {
	number: number;
	description: string;
	title: string;
	status: number;
};

type DetailedProposal = {
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
	status: number;
};

export { Proposal, DetailedProposal };
