import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { userData } from 'src/app/constants/users';
import { UserDataService } from './user-data.service';

import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'app-create-proposal',
	templateUrl: './create-proposal.component.html',
	styleUrls: ['./create-proposal.component.scss'],
})
export class CreateProposalComponent {
	text1 = 'VIP-101 Risk Parameters Adjustments for';
	text2 = ' SXP, TRX and ETH';

	proposalForm = new FormGroup({
		title: new FormControl('', [Validators.required]),
		description: new FormControl('', [Validators.required]),
	});
}
