import { Component } from '@angular/core';
import { Iproposals, items } from 'src/app/constants/proposals';

@Component({
	selector: 'app-proposals-main',
	templateUrl: './proposals-main.component.html',
	styleUrls: ['./proposals-main.component.scss'],
})
export class ProposalsMainComponent {
	title = 'Proposals';
	mobileText1 = 'VIP-101 Risk Parameters';
	mobileText2 = 'Adjustments for SXP, TRX';
	mobileText3 = 'and ETH';

	items: Iproposals[] = items;

	id = 0;

	slideRight(id: number): void {
		id = id + 1;
		console.log(id);
		this.id = id;
		if (this.id > 2) {
			this.id = 0;
		}
	}

	slideLeft(id: number): void {
		id = id - 1;
		console.log(id);
		this.id = id;
		if (this.id < 0) {
			this.id = 2;
		}
	}
}
