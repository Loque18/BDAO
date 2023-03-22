import { Component } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';

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
	templateUrl: './staking.component.html',
	styleUrls: ['./staking.component.scss'],
})
export class StakingComponent {
	txs = genTxs();

	constructor(private titleService: Title) {
		this.titleService.setTitle('BDAO • Staking');
	}

	// *~~*~~*~~ FORM ~~*~~*~~* //
	form: FormGroup = new FormGroup({
		amount: new FormControl(0),
	});

	max() {
		// set amount to max
		this.form.controls['amount'].setValue(100);
	}

	stake() {
		alert(JSON.stringify(this.form.value));
	}

	unstake() {
		console.log(this.form.value);
	}
}
