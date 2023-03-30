import { Component, OnInit } from '@angular/core';

import { Web3Service } from 'src/app/shared/services/web3.service';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { StakingService } from './s/staking.service';
import { EthEvents } from 'src/app/shared/celeste/constants';
import { UserService } from 'src/app/shared/services/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { StakingResponse } from 'src/app/shared/api/responses';

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

	data: any = {
		apr: 0,
		totalStaked: 0,
		activeStaked: 0,
		price: 1,
		spots: 0,
		totalProfit: 0,
	};

	constructor(
		private titleService: Title,
		protected web3Svc: Web3Service,
		protected stakingSvc: StakingService,
		// protected toastSvc: ToastrService,
		protected user: UserService
	) {
		this.titleService.setTitle('BDAO • Staking');
	}

	ngOnInit(): void {
		this.web3Svc.connectEvent.subscribe(() => {
			this.fetchData();
		});
	}

	// *~~*~~*~~ FORM ~~*~~*~~* //

	form: FormGroup = new FormGroup({
		amount: new FormControl('', [Validators.required]),
	});

	max() {
		// set amount to max
		const balanceBN = BigInt(this.user.data.balance);
		const balanceDec = Number(balanceBN) / 10 ** 18;
		const balanceWithTwoDecimals = balanceDec;
		this.form.controls['amount'].setValue(balanceWithTwoDecimals);
	}

	approve_zero() {
		this.stakingSvc.approve_zero().subscribe({
			next: (res) => {
				this.user.updateAllowance();
			},
			error: (err) => {
				// todo
			},
		});
	}

	approve() {
		this.stakingSvc.approve().subscribe({
			next: (res) => {
				// todo
				this.user.updateAllowance();
			},
			error: (err) => {
				// todo
			},
		});
	}

	submit(operation: string) {
		if (this.form.invalid) return;

		// get amount
		const amountDec = this.form.value.amount;
		const amountBN = BigInt(amountDec * 10 ** 18).toString();

		let method;
		if (operation == 'stake') method = this.stakingSvc.stake;
		else method = this.stakingSvc.unstake;

		// stake
		method(amountBN).subscribe({
			next: (tx: any) => {
				// todo
				this.user.updateBalance();

				this.form.reset();

				setTimeout(() => {
					this.fetchData();
				}, 5000);
			},
			error: () => {
				// todo

				this.form.reset();
			},
		});
	}

	stake() {
		// validate
		if (this.form.invalid) return;

		// get amount
		const amountDec = this.form.value.amount;

		const amountBN = BigInt(amountDec * 10 ** 18).toString();

		// stake
		this.stakingSvc.stake(amountBN).subscribe({
			next: (tx: any) => {
				// todo
				this.user.updateBalance();

				this.form.reset();

				setTimeout(() => {
					this.fetchData();
				}, 5000);
			},
			error: () => {
				// todo

				this.form.reset();
			},
		});
	}

	get needsApproval() {
		if (!this.form.value.amount) return false;

		return BigInt(Math.ceil(this.form.value.amount)) > BigInt(this.user.data.stakingAllowance);
	}

	unstake() {
		console.log(this.form.value);
	}

	connect() {
		// todo
	}

	//
	fetchData() {
		this.stakingSvc.getUserStats(this.web3Svc.walletData.address as string).subscribe({
			next: (res: StakingResponse) => {
				this.data = {
					...this.data,
					apr: res.data?.apr,
					totalStaked: res.data?.totalStaked,
					activeStaked: res.data?.activeStaked,
					price: res.data?.price,
					spots: res.data?.spots,
				};
			},

			error: (err) => {
				// todo
			},
		});
	}
}
