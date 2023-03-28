import { Injectable, EventEmitter } from '@angular/core';
import { from } from 'rxjs';

import { ProviderType } from '../celeste/celeste-types';

import { ICeleste } from '../models/iceleste';

import { config } from 'src/celeste.config';
import { environment } from 'src/environments/environment';
import { WalletData } from '../celeste/wallet-data';
import { Web3Wrapper } from '../celeste/we3-wrapper';
import { EthEvents } from '../celeste/constants';

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

	// *~~*~~*~~ service events ~~*~~*~~* //
	public readyEvent = new EventEmitter<null>();

	// *~~*~~*~~ Service internal data ~~*~~*~~* //

	private _celesteLoaded = false;

	public get walletData(): WalletData {
		if (this._celesteInstance) return this._celesteInstance.walletData;
		else return new WalletData();
	}

	public get web3Wrapper(): Web3Wrapper {
		if (this._celesteInstance) return this._celesteInstance.web3Wrapper;
		else return new Web3Wrapper();
	}

	private _loading = true;

	public get loading(): boolean {
		return this._loading;
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

	/**
	 * @description initializes the celeste library and emits the readyEvent to notify the subscribers
	 *
	 */
	init(): void {
		from(import('src/app/shared/celeste/celeste')).subscribe((m) => {
			this._celesteInstance = new m.Celeste();
			this._celesteLoaded = true;

			from(this._celesteInstance.init(config)).subscribe(() => {
				this._loading = false;
				this.readyEvent.emit();
			});
		});
	}

	requestConnection(providerType: ProviderType): Promise<void> {
		const p = new Promise<void>((resolve, reject) => {
			if (!this.canExecute())
				reject('Web3Service: requestConnection: cannot execute, web3 not ready');

			this._celesteInstance.requestConnection(providerType).then(() => {
				resolve();
			});
		});

		return p;
	}

	requestDisconnection() {
		if (!this.canExecute()) return;

		this._celesteInstance.requestDisconnection();
	}

	// *~~*~~*~~ Blockchain events ~~*~~*~~* //
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	on(eventkey: EthEvents, callback: (data: any) => void): void {
		if (!this.canExecute()) return;

		this._celesteInstance.on(eventkey, callback);
	}
}
