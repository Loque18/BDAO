import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AddressPipe } from 'src/app/shared/pipes/address/address.pipe';
import { Web3Service } from 'src/app/shared/services/web3.service';

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

	constructor(protected w3Svc: Web3Service) {}

	ngOnInit(): void {
		this.w3Svc.readyEvent.subscribe((ready) => {
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
		this.w3Svc.requestConnection('injected');
	}
}
