import { Component } from '@angular/core';
import { Iproposals , items } from 'src/app/constants/proposals';

@Component({
  selector: 'app-proposals',
  templateUrl: './proposals.component.html',
  styleUrls: ['./proposals.component.scss']
})
export class ProposalsComponent {
title = "Proposals"
firstBox = "VIP-101 Risk Parameters Adjustments for SXP, TRX and ETH"

items : Iproposals[] = items;
}
