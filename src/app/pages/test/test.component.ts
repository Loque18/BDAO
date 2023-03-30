import { Component } from '@angular/core';
import { from, skipUntil } from 'rxjs';
import { Contract } from 'web3-eth-contract';
import { Transaction } from 'web3-core';

import { Web3Service } from 'src/app/shared/services/web3.service';
import { UserService } from 'src/app/shared/services/user/user.service';

import { config } from 'src/celeste.config';

const { addressBook } = config;

@Component({
	selector: 'app-test',
	templateUrl: './test.component.html',
	styleUrls: ['./test.component.scss'],
})
export class TestComponent {
	constructor(protected web3Svc: Web3Service, protected userSvc: UserService) {}

	metamaskConnect(): void {
		this.web3Svc.requestConnection('injected');
	}

	wcConnect(): void {
		this.web3Svc.requestConnection('linked');
	}

	disconnect(): void {
		this.web3Svc.requestDisconnection();
	}

	// signMessage(): void {}

	log(): void {
		console.log('w3s', this.web3Svc.web3Wrapper);
	}

	give_allowance() {
		const brick: Contract = this.web3Svc.web3Wrapper.contracts['BRICKS'];

		const max =
			'115792089237316195423570985008687907853269984665640564039457584007913129639935';

		const tx = brick.methods.approve(addressBook['staking'], max);

		from(
			tx.send({
				from: this.web3Svc.walletData.address,
			})
		).subscribe((tx) => {
			console.log(tx);
		});
	}

	stake() {
		const staking: Contract = this.web3Svc.web3Wrapper.contracts['STAKING'];

		const tx = staking.methods.stake('1');

		from(
			tx.send({
				from: this.web3Svc.walletData.address,
			})
		).subscribe((tx) => {
			console.log(tx);
		});

		console.log(staking.methods);
		// from(staking.methods.stake.send)
	}

	sign() {
		this.web3Svc.sign('hello')?.then((res) => {
			console.log(res);
		});
	}
}
