import { Injectable } from '@angular/core';
import { Web3Service } from '../web3.service';

import { Contract } from 'web3-eth-contract';
import { from } from 'rxjs';

import { config } from 'src/celeste.config';

type UserData = {
	balance: string;
	stakingAllowance: string;
};

@Injectable({
	providedIn: 'root',
})
export class UserService {
	_loading: boolean = false;
	_data: UserData = {
		balance: '0',
		stakingAllowance: '0',
	};

	public get data(): UserData {
		return this._data;
	}

	public get loading(): boolean {
		return this._loading;
	}

	/**
	 * get user's blockchain data
	 * balance
	 * staked
	 */
	constructor(private w3Svc: Web3Service) {
		this.w3Svc.connectEvent.subscribe(() => {
			// balance
			const walletData = this.w3Svc.walletData;
			const w3 = this.w3Svc.web3Wrapper;

			const bricks_SC: Contract = w3.contracts['BRICKS_READ.97'];

			const balance_promise = bricks_SC.methods.balanceOf(walletData.address).call();
			const allowance_promise = bricks_SC.methods
				.allowance(walletData.address, config.addressBook['staking'])
				.call();

			from(Promise.all([balance_promise, allowance_promise])).subscribe((res) => {
				console.log(res);

				this._loading = false;

				this._data.balance = res[0];
				this._data.stakingAllowance = res[1];
			});
			// approved
		});
	}

	updateBalance(): void {
		const walletData = this.w3Svc.walletData;
		const w3 = this.w3Svc.web3Wrapper;

		const bricks_SC: Contract = w3.contracts['BRICKS_READ.97'];

		from(bricks_SC.methods.balanceOf(walletData.address).call()).subscribe((res) => {
			this._data.balance = res as string;
		});
	}

	updateAllowance(): void {
		const walletData = this.w3Svc.walletData;
		const w3 = this.w3Svc.web3Wrapper;

		const bricks_SC: Contract = w3.contracts['BRICKS_READ.97'];

		from(
			bricks_SC.methods.allowance(walletData.address, config.addressBook['staking']).call()
		).subscribe((res) => {
			this._data.stakingAllowance = res as string;
		});
	}
}
