import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';

import { AllProposalsResponse, ProposalResponse, VoteResponse } from 'src/app/shared/api/responses';

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

		return this.http.get<AllProposalsResponse>(url);
		// .pipe(
		// 	catchError(
		// 		this.handleError<AllProposalsResponse>('getProposals', {
		// 			success: false,
		// 			statusCode: 500,
		// 		})
		// 	)
		// );
	}

	getProposal(number: number): Observable<ProposalResponse> {
		const url = api.proposals.byId(number);

		return this.http.get<ProposalResponse>(url);
		// .pipe(catchError(this.handleError<ProposalResponse>(`get proposal id =${number}`)));
	}

	/**
	 * return undefined if proposal not found
	 */
	getProposalNo404(number: number): Observable<ProposalResponse> {
		const url = api.proposals.byId(number);

		return this.http.get<ProposalResponse>(url).pipe(catchError(this.handleError));
	}

	postProposal(
		title: string,
		description: string,
		signature: string
	): Observable<ProposalResponse> {
		const url = api.proposals.add(title, description, signature);

		return this.http.post<ProposalResponse>(url, {});
	}

	vote(
		number: number,
		vote: number, // 0 = yes, 1 = no, 2 = abstain
		signature: string
	): Observable<VoteResponse> {
		const url = api.proposals.vote(number, vote, signature);

		return this.http.post<VoteResponse>(url, {});
	}

	// *~~*~~*~~ handle errors ~~*~~*~~* //

	/**
	 * Transform the error for user consumption.
	 *
	 * @param operation - name of the operation that failed
	 * @param result - optional value to return as the observable result
	 */
	private handleError(error: HttpErrorResponse) {
		console.log('original__', error);

		let errorMessage = 'An unknown error occurred!';

		if (error.error instanceof Error || error.error instanceof ProgressEvent) {
			// A client-side or network error occurred.
			errorMessage = 'A network error occurred. please try again';
		} else {
			// A server-side error occurred.
			if (error.status >= 500) {
				errorMessage = 'There was a server error. Please try again later.';
			} else {
				// You can handle specific error codes here or transform the error message
				errorMessage = `Server returned code ${error.status}, with error: ${error.error}`;
			}
		}

		return throwError(() => new Error(errorMessage));
	}
}
