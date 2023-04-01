import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ivote, items } from 'src/app/constants/vote-proposal';
import { ProposalResponse } from 'src/app/shared/api/responses';
import { ProposalsService } from '../s/proposals.service';

import { DetailedProposal } from 'src/app/shared/models/proposal/proposal';

@Component({
	selector: 'app-vote-proposal',
	templateUrl: './vote-proposal.component.html',
	styleUrls: ['./vote-proposal.component.scss'],
})
export class VoteProposalComponent implements OnInit {
	constructor(private proposalsSvc: ProposalsService, private router: ActivatedRoute) {}

	protected _loading: boolean = false;
	protected _error: boolean = false;
	protected _errorMessage: string = '';

	protected proposal: DetailedProposal = {
		number: 0,
		againstVotes: 0,
		againstVotingWeight: 0,
		absentVotes: 0,
		withVotes: 0,
		description: '',
		votes: [],
		creationgTime: 0,
		title: 'asd',
		abstainVotingWeight: 0,
		status: 0,
	};

	title = 'Overview';

	number = '0';
	text1Mobile = 'VIP-101 Risk Parameters';
	text2Mobile = 'Adjustments for SXP, TRX';
	text3Mobile = 'and ETH';

	items: Ivote[] = items;

	ngOnInit(): void {
		this._loading = true;

		const proposalId = this.router.snapshot.params['id'];

		this.proposalsSvc.getProposalNo404(proposalId).subscribe({
			next: (res: ProposalResponse) => {
				if (res.success) {
					this.proposal = res.data;
					console.log(this.proposal);
				} else {
					this._handleError(res.message);
				}

				this._loading = false;
			},
			error: (err) => {
				console.log(err.message);

				this._handleError(err.message);

				this._loading = false;
			},
		});
	}

	private _handleError(msg: string): void {
		this._error = true;
		this._errorMessage = msg;
	}
}
