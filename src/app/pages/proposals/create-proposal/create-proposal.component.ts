import { Component } from '@angular/core';
import { Observable, from } from 'rxjs';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProposalsService } from '../s/proposals.service';
import { Web3Service } from 'src/app/shared/services/web3.service';
import { ToastrService } from 'ngx-toastr';
import { ModalCoreService } from 'src/app/shared/modal/services/modal-core.service';
import { APP_MODALS } from 'src/app/shared/static/app.modals';

@Component({
	selector: 'app-create-proposal',
	templateUrl: './create-proposal.component.html',
	styleUrls: ['./create-proposal.component.scss'],
})
export class CreateProposalComponent {
	constructor(
		private proposalsSvc: ProposalsService,
		private w3Svc: Web3Service,
		public toastService: ToastrService,
		public modalSvc: ModalCoreService
	) {}

	loading: boolean = false;

	proposalForm = new FormGroup({
		title: new FormControl('', [Validators.required]),
		description: new FormControl('', [Validators.required]),
	});

	protected get walletConnected() {
		return this.w3Svc.walletData.isLoggedIn;
	}

	protected connectW(): void {
		this.modalSvc.openModal(APP_MODALS.WALLETS);
	}

	submit() {
		if (this.proposalForm.invalid) {
			return;
		}

		this.loading = true;

		const title = this.proposalForm.value['title'] as string;
		const description = this.proposalForm.value['description'] as string;

		from(this.w3Svc.sign(`${title} ${description}`)).subscribe((signature) => {
			const s = signature as string;

			this.proposalsSvc.postProposal(title, description, s).subscribe({
				next: (res) => {
					if (res.success) {
						this.toastService.success('Proposal created successfully');
					} else {
						switch (res.statusCode) {
							case 614:
								this.toastService.error(
									'Insufficient voting weight, please stake more bricks'
								);
								break;

							default:
								this.toastService.error('Proposal creation failed');
								break;
						}
					}

					this.loading = false;
				},
				error: () => {
					this.toastService.error('there was a network error, please try again later');

					this.loading = false;
				},
			});
		});
	}
}
