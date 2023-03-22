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
text1Mobile ='VIP-101 Risk Parameters'
text2Mobile='Adjustments for SXP, TRX'
text3Mobile ='and ETH'

items : Ivote[] = items
}
