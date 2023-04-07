import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ModalCoreService } from 'src/app/shared/modal/services/modal-core.service';
import { AddressPipe } from 'src/app/shared/pipes/address/address.pipe';
import { Web3Service } from 'src/app/shared/services/web3.service';

import { APP_MODALS } from 'src/app/shared/static/app.modals';

@Component({
	selector: 'app-connect-btn',
	templateUrl: './connect-btn.component.html',
	styleUrls: ['./connect-btn.component.scss'],
	standalone: true,
	imports: [CommonModule, AddressPipe],
})
export class ConnectBtnComponent implements OnInit {
	@Input() public classNames: string = '';

	protected loading: boolean = true;

	constructor(protected w3Svc: Web3Service, private modalSvc: ModalCoreService) {}

	ngOnInit(): void {
		this.w3Svc.readyEvent.subscribe(() => {
			this.loading = false;
		});
	}

	get walletAddress(): string | null {
		return this.w3Svc.walletData.address;
	}

	get connected() {
		return this.w3Svc.walletData.isLoggedIn;
	}

	connect() {
		if (this.w3Svc.walletData.isLoggedIn) return;

		this.modalSvc.openModal(APP_MODALS.WALLETS);
		// this.w3Svc.requestConnection('injected');
	}
}
