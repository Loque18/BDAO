import { Component, OnInit } from '@angular/core';
import { Iproposals, items } from 'src/app/constants/proposals';
import { ProposalsResponse } from 'src/app/shared/api/responses';

import { ProposalsService } from '../s/proposals.service';

import { Proposal } from 'src/app/shared/models/proposal/proposal';
import { Web3Service } from 'src/app/shared/services/web3.service';

@Component({
	selector: 'app-proposals-main',
	templateUrl: './proposals-main.component.html',
	styleUrls: ['./proposals-main.component.scss'],
})
export class ProposalsMainComponent implements OnInit {
	loading: boolean = true;
	error: boolean = false;
	proposals: Proposal[] = [];
	votingWeight: number = 0;

	constructor(private proposalsSvc: ProposalsService, private web3Svc: Web3Service) {}

	ngOnInit(): void {
		// get proposals

		if (!this.web3Svc.loading) {
			this.fetch(this.web3Svc.walletData.address as string);
		} else {
			this.web3Svc.readyEvent.subscribe(() => {
				if (this.web3Svc.walletData.isLoggedIn) {
					this.fetch(this.web3Svc.walletData.address as string);
				} else {
					this.fetch();
				}
			});
		}
	}

	fetch(address?: string) {
		this.proposalsSvc.getProposals(address).subscribe((res: ProposalsResponse) => {
			if (res.success) {
				this.proposals = res.data.proposals;
				this.votingWeight = res.data.votingWeight;
			} else {
				this.error = true;
			}

			this.loading = false;
		});
	}

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
