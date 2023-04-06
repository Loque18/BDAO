type IAppConfig = {
	appTitle: string;
	appVersion: string;
	appDescription: string;
	appOgImageUrl: string;
};

const APP_CONFIG: IAppConfig = {
	appTitle: 'BDAO',
	appVersion: '0.1.0',
	appDescription: 'Bricklayer DAO',
	appOgImageUrl: 'https://picsum.photos/1200/630',
};

export { APP_CONFIG };
