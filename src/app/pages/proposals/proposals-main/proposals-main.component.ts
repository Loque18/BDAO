import { Component, OnInit } from '@angular/core';
import { Iproposals, items } from 'src/app/constants/proposals';
import { AllProposalsResponse } from 'src/app/shared/api/responses';

import { ProposalsService } from '../s/proposals.service';

import { Proposal } from 'src/app/shared/models/proposal/proposal';
import { DragScrollComponent } from 'ngx-drag-scroll';

@Component({
	selector: 'app-proposals-main',
	templateUrl: './proposals-main.component.html',
	styleUrls: ['./proposals-main.component.scss'],
})
export class ProposalsMainComponent implements OnInit {
	loading: boolean = true;
	error: boolean = false;
	proposals: Proposal[] = [];

	constructor(private proposalsSvc: ProposalsService) {}

	ngOnInit(): void {
		// get proposals
		this.proposalsSvc.getProposals().subscribe((res: AllProposalsResponse) => {
			if (res.success) {
				this.proposals = res.data as Proposal[];
				console.log(res.data)
			} else {
				this.error = true;
			}

			this.loading = false;
			
		});
			
	}
	mobileText1 = 'VIP-101 Risk Parameters';
	mobileText2 = 'Adjustments for SXP, TRX';
	mobileText3 = 'and ETH';

	items: Iproposals[] = items;
}
