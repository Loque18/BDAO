import { Injectable } from '@angular/core';
import { from, Observable, Subject } from 'rxjs';

import { ProviderType } from '../celeste/celeste-types';

import { ICeleste } from '../models/iceleste';

import { config } from 'src/celeste.config';
import { environment } from 'src/environments/environment';
import { WalletData } from '../celeste/wallet-data';

/**
 * in order to keep the main bundle size small, we are using lazy loading for the celeste library
 * it is loaded only when the user needs it,
 * or when some data is requested from the blockchain
 */

@Injectable({
	providedIn: 'root',
})
export class Web3Service {
	constructor() {
		setTimeout(() => {
			this.init();
		}, 500);
	}

	// *~~*~~*~~ Service internal data ~~*~~*~~* //

	private _celesteLoaded = false;

	public get walletData(): WalletData {
		if (this._celesteInstance) return this._celesteInstance.walletData;
		else return new WalletData();
	}

	/**
	 * @description guard to avoid calling celeste methods before it is loaded
	 * @returns true if celeste is loaded and ready to be used
	 */
	canExecute(): boolean {
		const l = () => {
			if (environment.development)
				console.log('Web3Service: requestConnection: cannot execute', {
					_celesteLoaded: this._celesteLoaded,
					_celesteInstance: this._celesteInstance,
					// _celesteInstanceReady: this._celesteInstance.ready,
				});
		};

		if (!this._celesteLoaded) {
			l();
			return false;
		}

		if (!this._celesteInstance) {
			l();
			return false;
		}

		if (!this._celesteInstance.ready) {
			l();
			return false;
		}

		return true;
	}

	// *~~*~~*~~ Celeste Interface ~~*~~*~~* //

	private _celesteInstance!: ICeleste;

	private eventSubject: Subject<any> = new Subject<any>();
	public event$: Observable<any> = this.eventSubject.asObservable();

	init(): void {
		from(import('src/app/shared/celeste/celeste')).subscribe((m) => {
			this._celesteInstance = new m.Celeste();
			this._celesteInstance.init(config);

			this._celesteLoaded = true;
		});
	}

	requestConnection(providerType: ProviderType) {
		if (!this.canExecute()) return;

		this._celesteInstance.requestConnection(providerType);
	}

	requestDisconnection() {
		if (!this.canExecute()) return;

		this._celesteInstance.requestDisconnection();
	}
}
