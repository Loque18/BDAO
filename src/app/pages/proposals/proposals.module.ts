import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutModule } from 'src/app/layout/layout.module';

import { ProposalsRoutingModule } from './proposals-routing.module';
import { ProposalsMainComponent } from './proposals-main/proposals-main.component';
import { VoteProposalComponent } from './vote-proposal/vote-proposal.component';
import { CreateProposalComponent } from './create-proposal/create-proposal.component';


@NgModule({
  declarations: [
    ProposalsMainComponent,
    CreateProposalComponent,
    //VoteProposalComponent
  ],
  imports: [
    CommonModule,
    ProposalsRoutingModule,

    LayoutModule
  ]
})
export class ProposalsModule { }
