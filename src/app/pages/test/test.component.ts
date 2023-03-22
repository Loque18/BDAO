import { Component, OnInit } from '@angular/core';
import { Web3Service } from 'src/app/shared/services/web3.service';

@Component({
	selector: 'app-test',
	templateUrl: './test.component.html',
	styleUrls: ['./test.component.scss'],
})
export class TestComponent {
	constructor(protected web3Svc: Web3Service) {}

	metamaskConnect(): void {
		this.web3Svc.requestConnection('injected');
	}

	wcConnect(): void {
		this.web3Svc.requestConnection('linked');
	}

	disconnect(): void {
		this.web3Svc.requestDisconnection();
	}

	signMessage(): void {}
}
