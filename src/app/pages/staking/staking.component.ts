import { Component } from '@angular/core';

type Tx = {
	amount: number;
	date: Date;
	totalDividends: number;
	link: string;
};

function genTxs() {
	const txs: Tx[] = [];

	for (let i = 0; i < 10; i++) {
		const tx: Tx = {
			amount: Math.random() * 100,
			date: new Date(),
			totalDividends: Math.random() * 100,
			link: 'https://example.com',
		};

		txs.push(tx);
	}

	return txs;
}

@Component({
	selector: 'app-staking',
	templateUrl: './test.html',
	styleUrls: ['./staking.component.scss'],
})
export class StakingComponent {
	txs = genTxs();

	constructor() {}
}
