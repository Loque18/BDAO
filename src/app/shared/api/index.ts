import { environment } from 'src/environments/environment';

const baseUrl = environment.apiUrl;

const api = {
	url: baseUrl,

	treasury: {
		assets: `${baseUrl}/allAssets`,
	},
};

export { api };
