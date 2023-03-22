import { Component } from '@angular/core';
import { Ivote, items } from 'src/app/constants/vote-proposal';

@Component({
  selector: 'app-vote-proposal',
  templateUrl: './vote-proposal.component.html',
  styleUrls: ['./vote-proposal.component.scss']
})
export class VoteProposalComponent {
title  = 'Overview'
text1 = 'VIP-101 Risk Parameters Adjustments for'
text2 = ' SXP, TRX and ETH'
smallText = '#001'

items : Ivote[] = items
}
