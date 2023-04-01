import { Component } from '@angular/core';
import { Observable, from } from 'rxjs';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProposalsService } from '../s/proposals.service';
import { Web3Service } from 'src/app/shared/services/web3.service';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-create-proposal',
	templateUrl: './create-proposal.component.html',
	styleUrls: ['./create-proposal.component.scss'],
})
export class CreateProposalComponent {
	constructor(
		private proposalsSvc: ProposalsService,
		private w3Svc: Web3Service,
		public toastService: ToastrService
	) {}

	proposalForm = new FormGroup({
		title: new FormControl('', [Validators.required]),
		description: new FormControl('', [Validators.required]),
	});

	submit() {
		if (this.proposalForm.invalid) {
			return;
		}

		const title = this.proposalForm.value['title'] as string;
		const description = this.proposalForm.value['description'] as string;

		from(this.w3Svc.sign(`${title} ${description}`)).subscribe((signature) => {
			const s = signature as string;

			this.proposalsSvc.postProposal(title, description, s).subscribe((res) => {
				if (res.success) {
					this.toastService.success('Proposal created successfully');
				} else {
					this.toastService.error('Proposal creation failed');
				}
			});
		});
	}
}
