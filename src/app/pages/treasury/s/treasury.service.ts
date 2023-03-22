import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, Observable, of } from 'rxjs';

import { TreasuryResponse } from 'src/app/shared/api/responses';

import { api } from 'src/app/shared/api';
import { environment } from 'src/environments/environment';
import { Asset, AssetGroup } from 'src/app/shared/models/asset';

@Injectable({
	// provide only on treasury module

	providedIn: 'root',
})
export class TreasuryService {
	private _selected: 'properties' | 'crypto' = 'properties';
	public get selected(): 'properties' | 'crypto' {
		return this._selected;
	}

	public options: Readonly<string>[] = ['properties', 'crypto'];

	constructor(private http: HttpClient) {}

	private _assets: AssetGroup = {
		properties: [],
		crypto: [],
	};

	public get assets(): Asset[] {
		return this._assets[this._selected];
	}

	// *~~*~~*~~ internal ~~*~~*~~* //

	fetchAssets(): void {
		this.getAssets().subscribe((res) => {
			if (res.success) {
				this._assets.properties = res.data?.properties || [];
				this._assets.crypto = res.data?.crypto || [];
			}
		});
	}

	// *~~*~~*~~ HTTPS REQUESTS ~~*~~*~~* //

	getAssets(): Observable<TreasuryResponse> {
		return this.http.get<TreasuryResponse>(api.treasury.assets).pipe(
			catchError(
				this.handleError<TreasuryResponse>('getAssets', {
					success: false,
					statusCode: 500,
				})
			)
		);
	}

	changeSelected(selected: string): void {
		this._selected = selected as 'properties' | 'crypto';
	}

	// *~~*~~*~~ HANDLE ERRORS ~~*~~*~~* //

	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			if (!environment.production) {
				console.error(`error in ${operation}`, error);
			}

			return of(result as T);
		};
	}
}
