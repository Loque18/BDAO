import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ivote, items } from 'src/app/constants/vote-proposal';
import { ProposalResponse } from 'src/app/shared/api/responses';
import { ProposalsService } from '../s/proposals.service';

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

	title = 'Overview';
	text1 = 'VIP-101 Risk Parameters Adjustments for';
	text2 = ' SXP, TRX and ETH';
	smallText = '#001';
	text1Mobile = 'VIP-101 Risk Parameters';
	text2Mobile = 'Adjustments for SXP, TRX';
	text3Mobile = 'and ETH';

	items: Ivote[] = items;

	ngOnInit(): void {
		this._loading = true;

		const proposalId = this.router.snapshot.params['id'];

		this.proposalsSvc.getProposalNo404(proposalId).subscribe({
			next: (res: ProposalResponse) => {
				if (!res.success && res.statusCode === 615) {
					this._handleError('Proposal not found');
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
