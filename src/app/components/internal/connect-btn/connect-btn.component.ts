import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AddressPipe } from 'src/app/shared/pipes/address/address.pipe';
import { Web3Service } from 'src/app/shared/services/web3.service';

@Component({
	selector: 'app-connect-btn',
	templateUrl: './connect-btn.component.html',
	styleUrls: ['./connect-btn.component.scss'],
	standalone: true,
	imports: [CommonModule, AddressPipe],
})
export class ConnectBtnComponent {
	@Input() public classNames: string = '';

	constructor(protected w3Svc: Web3Service) {}

	get walletAddress(): string | null {
		return this.w3Svc.walletData.address;
	}

	get connected() {
		return this.w3Svc.walletData.isLoggedIn;
	}

	connect() {
		this.w3Svc.requestConnection('injected');
	}
}
