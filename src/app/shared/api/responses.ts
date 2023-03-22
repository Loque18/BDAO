import { Asset } from '../models/asset';

type ApiResponse = {
	success: boolean;
	statusCode: number;
	data?: {};
	message?: string;
};

type TreasuryResponse = ApiResponse & {
	data?: {
		properties: Asset[];
		crypto: Asset[];
	};
};

export { TreasuryResponse };
