import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, from, Observable, of } from 'rxjs';

import { Contract } from 'web3-eth-contract';

import { Web3Service } from 'src/app/shared/services/web3.service';
import { StakingResponse } from 'src/app/shared/api/responses';

import { api } from 'src/app/shared/api';
import { environment } from 'src/environments/environment';
import { StakingStats } from 'src/app/shared/models/staking/stats';
import { UserService } from 'src/app/shared/services/user/user.service';

import { config } from 'src/celeste.config';

@Injectable({
	providedIn: 'root',
})
export class StakingService {
	data: StakingStats = {
		activeStaked: 0,
		spots: 0,
		totalProfit: 0,
		inactiveStaked: 0,
		rewardsHistory: [],
		apr: 0,
	};

	loading: boolean = false;
	error: boolean = false;

	constructor(private http: HttpClient, private w3Svc: Web3Service) {}

	fetchUserStats(address: string): void {
		this.loading = true;

		this.getUserStats(address).subscribe((res) => {
			this.loading = false;

			if (res.success) {
				// do something
				this.data = res.data as StakingStats;
			} else {
				this.error = true;
			}
		});
	}

	// *~~*~~*~~ Smart contract interaction ~~*~~*~~* //

	public approve(): Observable<unknown> {
		const bricks_SC: Contract = this.w3Svc.web3Wrapper.contracts['BRICKS'];

		const amount =
			'115792089237316195423570985008687907853269984665640564039457584007913129639935';

		const tx = bricks_SC.methods.approve(config.addressBook['staking'], amount);

		return from(
			tx.send({
				from: this.w3Svc.walletData.address,
			})
		);
	}

	public approve_zero(): Observable<unknown> {
		const bricks_SC: Contract = this.w3Svc.web3Wrapper.contracts['BRICKS'];

		const tx = bricks_SC.methods.approve(config.addressBook['staking'], 0);

		return from(
			tx.send({
				from: this.w3Svc.walletData.address,
			})
		);
	}

	public stake(amount: string): Observable<unknown> {
		console.log(this);

		const staking_SC: Contract = this.w3Svc.web3Wrapper.contracts['STAKING'];

		const tx = staking_SC.methods.stake(amount);

		return from(
			tx.send({
				from: this.w3Svc.walletData.address,
			})
		);
	}

	public unstake(amount: string): Observable<unknown> {
		const staking_SC: Contract = this.w3Svc.web3Wrapper.contracts['STAKING'];

		const tx = staking_SC.methods.unstake(amount);

		return from(
			tx.send({
				from: this.w3Svc.walletData.address,
			})
		);
	}

	// *~~*~~*~~ HTTPS REQUESTS ~~*~~*~~* //

	public getUserStats(address: string): Observable<StakingResponse> {
		const url = `${api.staking.stats}?userAddress=${address}`;

		return this.http.get<StakingResponse>(url).pipe(
			catchError(
				this.handleError<StakingResponse>('getAssets', {
					success: false,
					message: 'Error while fetching user stats',
					statusCode: 500,
				})
			)
		);
	}

	public getUserBalance(address: string): Observable<string> {
		const bricks_SC = this.w3Svc.web3Wrapper.contracts['BRICKS_READ.97'];

		return from(bricks_SC.methods.balanceOf(address).call()) as Observable<string>;
	}

	// *~~*~~*~~ HANDLE ERRORS ~~*~~*~~* //

	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			if (environment.development) {
				console.error(`error in ${operation}`, error);
			}

			return of(result as T);
		};
	}
}
