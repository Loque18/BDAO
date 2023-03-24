import { environment } from 'src/environments/environment';

const baseUrl = environment.apiUrl;

const api = {
	url: baseUrl,

	treasury: {
		assets: `${baseUrl}/allAssets`,
	},

	staking: {
		stats: `${baseUrl}/staking/getUserStakingStats`,
	},

	proposals: {
		all: `${baseUrl}/proposals/getAllProposals`,
		byId: (id: number) => `${baseUrl}/proposals/getProposalInfo?proposalNumber=${id}`,
	},
};

export { api };
