import { Component } from '@angular/core';
import { Iproposals , items } from 'src/app/constants/proposals';

@Component({
  selector: 'app-proposals',
  templateUrl: './proposals.component.html',
  styleUrls: ['./proposals.component.scss']
})
export class ProposalsComponent {
title = "Proposals"
mobileText1 = "VIP-101 Risk Parameters"
mobileText2 = "Adjustments for SXP, TRX"
mobileText3 = "and ETH"

items : Iproposals[] = items;
}
