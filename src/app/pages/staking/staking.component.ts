import { Component, OnInit } from '@angular/core';

import { Web3Service } from 'src/app/shared/services/web3.service';

import { FormGroup, FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { StakingService } from './s/staking.service';

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
export class StakingComponent implements OnInit {
	txs = genTxs();

	constructor(
		private titleService: Title,
		protected web3Svc: Web3Service,
		private stakingSvc: StakingService
	) {
		this.titleService.setTitle('BDAO • Staking');
	}

	ngOnInit(): void {
		// throw new Error('Method not implemented.');

		// const address = '0x0';
		// this.stakingSvc.getUserStats(address).subscribe((res) => {
		// 	console.log(res);
		// });

		this.web3Svc.readyEvent.subscribe(() => {
			console.log(this.web3Svc.walletData);

			const address = this.web3Svc.walletData.address;

			if (!this.web3Svc.walletData.isLoggedIn || !address) return;

			this.stakingSvc.fetchUserStats(address);
		});
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
