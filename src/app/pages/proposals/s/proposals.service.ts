import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

import { AllProposalsResponse, ProposalResponse } from 'src/app/shared/api/responses';

import { api } from 'src/app/shared/api';
import { Proposal } from 'src/app/shared/models/proposal/proposal';

@Injectable({
	providedIn: 'root',
})
export class ProposalsService {
	// *~~*~~*~~ deps ~~*~~*~~* //
	constructor(private http: HttpClient) {}

	// *~~*~~*~~ http requests ~~*~~*~~* //

	/**
	 * Get all proposals
	 * @returns
	 */
	getProposals(): Observable<AllProposalsResponse> {
		const url = api.proposals.all;

		return this.http.get<AllProposalsResponse>(url).pipe(
			catchError(
				this.handleError<AllProposalsResponse>('getProposals', {
					success: false,
					statusCode: 500,
				})
			)
		);
	}

	getProposal(number: number): Observable<ProposalResponse> {
		const url = api.proposals.byId(number);

		return this.http
			.get<ProposalResponse>(url)
			.pipe(catchError(this.handleError<ProposalResponse>(`get proposal id =${number}`)));
	}

	/**
	 * return undefined if proposal not found
	 */
	// getProposalNo404<Data>(number: number): Observable<ProposalResponse> {
	// 	const url = api.proposals.byId(number);

	// 	return this.http.get<ProposalResponse>(url).pipe(
	// 		map((proposal) => {
	// 			if (proposal.success) {
	// 				return proposal;
	// 			} else {
	// 				return undefined;
	// 			}
	// 		}),

	// 		catchError(this.handleError<ProposalResponse>(`getProposal id=${number}`))
	// 	);
	// }

	/**
	 * Handle Http operation that failed.
	 * Let the app continue.
	 *
	 * @param operation - name of the operation that failed
	 * @param result - optional value to return as the observable result
	 */
	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			// TODO: send the error to remote logging infrastructure
			console.error(error); // log to console instead

			// Let the app keep running by returning an empty result.
			return of(result as T);
		};
	}
}
