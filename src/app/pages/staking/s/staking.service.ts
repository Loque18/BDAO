import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

import { Web3Service } from 'src/app/shared/services/web3.service';
import { StakingResponse } from 'src/app/shared/api/responses';

import { api } from 'src/app/shared/api';
import { environment } from 'src/environments/environment';
import { StakingStats } from 'src/app/shared/models/staking/stats';

@Injectable({
	providedIn: 'root',
})
export class StakingService {
	data: StakingStats = {
		activeStaked: 0,
		spots: 0,
		totalProfit: 0,
		totalStaked: 0,
		rewardsHistory: [],
	};

	loading: boolean = false;
	error: boolean = false;

	constructor(private http: HttpClient) {}

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

	// *~~*~~*~~ HTTPS REQUESTS ~~*~~*~~* //

	private getUserStats(address: string): Observable<StakingResponse> {
		const url = `${api.staking.stats}?userAddress=${address}`;

		return this.http.get<StakingResponse>(url).pipe(
			catchError(
				this.handleError<StakingResponse>('getAssets', {
					success: false,
					statusCode: 500,
				})
			)
		);
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
