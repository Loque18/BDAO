type Asset = {
	image: string;
	quantity: number;
	name: string;
	usdValue: number;
	moreInfoLink: string;
};

type AssetGroup = {
	properties: Asset[];
	crypto: Asset[];
};

export { Asset, AssetGroup };
