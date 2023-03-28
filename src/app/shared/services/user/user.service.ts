import { Injectable } from '@angular/core';
import { Web3Service } from '../web3.service';

import { Contract } from 'web3-eth-contract';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	data: {} = {};

	/**
	 * get user's blockchain data
	 * balance
	 * staked
	 */
	constructor(private w3Svc: Web3Service) {
		this.w3Svc.readyEvent.subscribe(() => {
			if (!this.w3Svc.walletData.isLoggedIn) return;

			const bricksSC: Contract = this.w3Svc.web3Wrapper.contracts['BRICKS'];

			console.log(bricksSC.methods);
		});
	}
}
