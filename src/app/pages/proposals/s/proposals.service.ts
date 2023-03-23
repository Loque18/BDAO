import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

import { AllProposalsResponse } from 'src/app/shared/api/responses';

import { api } from 'src/app/shared/api';

@Injectable({
	providedIn: 'root',
})
export class ProposalsService {
	// *~~*~~*~~ deps ~~*~~*~~* //
	constructor(private http: HttpClient) {}

	// *~~*~~*~~ http requests ~~*~~*~~* //
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
