import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ivote, items } from 'src/app/constants/vote-proposal';
import { ProposalResponse, VoteResponse } from 'src/app/shared/api/responses';
import { ProposalsService } from '../s/proposals.service';

import { DetailedProposal, Vote } from 'src/app/shared/models/proposal/proposal';
import { Web3Service } from 'src/app/shared/services/web3.service';
import { from } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { APP_MODALS } from 'src/app/shared/static/app.modals';
import { ModalCoreService } from 'src/app/shared/modal/services/modal-core.service';

type VoteData = {
	id: number;
	title: string;
	count: number;
	weight: number;
	color: string;
	percent: number;
	type: number;
	votes: Vote[];
};

@Component({
	selector: 'app-vote-proposal',
	templateUrl: './vote-proposal.component.html',
	styleUrls: ['./vote-proposal.component.scss'],
})
export class VoteProposalComponent implements OnInit {
	constructor(
		private proposalsSvc: ProposalsService,
		private router: ActivatedRoute,
		private w3Svc: Web3Service,
		private toastr: ToastrService,
		private modalSvc: ModalCoreService
	) {}

	protected _loading: boolean = false;
	protected _error: boolean = false;
	protected _errorMessage: string = '';

	protected proposal: DetailedProposal = {
		number: 0,
		againstVotes: 0,
		abstainVotes: 0,
		withVotes: 1,
		againstVotingWeight: 0,
		abstainVotingWeight: 0,
		withVotingWeight: 1,
		description: '',
		votes: [],
		creationgTime: 0,
		title: '',
		status: 0,
	};

	protected votesArr: VoteData[] = [];

	// items: Ivote[] = items;

	ngOnInit(): void {
		this.fetch();
	}

	fetch() {
		this._loading = true;

		const proposalId = this.router.snapshot.params['id'];

		this.proposalsSvc.getProposalNo404(proposalId).subscribe({
			next: (res: ProposalResponse) => {
				this._loading = false;

				if (res.success) {
					this.proposal = res.data;

					const v: VoteData[] = this.calc();

					this.votesArr = v;
				} else {
					this._handleError(res.message);
				}
			},
			error: (err) => {
				this._handleError(err.message);

				this._loading = false;
			},
		});
	}

	protected calc(): VoteData[] {
		const res = [];

		const totalWeight =
			this.proposal.withVotingWeight +
			this.proposal.againstVotingWeight +
			this.proposal.abstainVotingWeight;

		// with
		res.push({
			id: this.proposal.number,
			title: 'WITH',
			count: this.proposal.withVotes,
			weight: this.proposal.withVotingWeight,
			color: 'bg-green-1',
			percent: totalWeight === 0 ? 0 : (this.proposal.withVotingWeight / totalWeight) * 100,
			type: 0,
			votes: this.proposal.votes.filter((v: Vote) => v.vote === 0),
		});

		// against
		res.push({
			id: this.proposal.number,
			title: 'AGAINST',
			count: this.proposal.againstVotes,
			weight: this.proposal.againstVotingWeight,
			color: 'bg-red-1',
			percent:
				totalWeight === 0 ? 0 : (this.proposal.againstVotingWeight / totalWeight) * 100,
			type: 1,
			votes: this.proposal.votes.filter((v: Vote) => v.vote === 1),
		});

		// absent
		res.push({
			id: this.proposal.number,
			title: 'ABSTAIN',
			count: this.proposal.abstainVotes,
			weight: this.proposal.abstainVotingWeight,
			color: 'bg-blue-1',
			percent:
				totalWeight === 0 ? 0 : (this.proposal.abstainVotingWeight / totalWeight) * 100,
			type: 2,
			votes: this.proposal.votes.filter((v: Vote) => v.vote === 2),
		});

		return res;
	}

	private _handleError(msg: string): void {
		this._error = true;
		this._errorMessage = msg;
	}

	vote(type: number, proposalNumber: number): void {
		let _type: string = '';

		if (type === 0) _type = 'With';
		else if (type === 1) _type = 'Against';
		else if (type === 2) _type = 'Abstain';

		from(this.w3Svc.sign(`${_type} ${proposalNumber}`)).subscribe({
			next: (res: unknown) => {
				const signature = res as string;

				this.proposalsSvc.vote(this.proposal.number, type, signature).subscribe({
					next: (res: VoteResponse) => {
						if (res.success) {
							this.toastr.info(res.message);

							// // add vote to total votes
							// if (type === 0) this.proposal.withVotes++;
							// else if (type === 1) this.proposal.againstVotes++;
							// else if (type === 2) this.proposal.abstainVotes++;1

							// this.fetch();
						} else {
							this.toastr.error(res.message);
						}
					},
					error: () => {
						this.toastr.error('something went wrong, please try again');
					},
				});
			},
			error: (err) => {
				this.toastr.error(err.message);
			},
		});
	}

	get walletConnected(): boolean {
		return this.w3Svc.walletData.isLoggedIn;
	}

	connectW(): void {
		this.modalSvc.openModal(APP_MODALS.WALLETS);
	}

	copyToClipboard(msg: string): void {
		navigator.clipboard.writeText(msg);
		this.toastr.info('Address copied to clipboard');
	}
}
