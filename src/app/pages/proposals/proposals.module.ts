import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import {NgxPopperModule} from 'ngx-popper';

import { LayoutModule } from 'src/app/layout/layout.module';

import { ProposalsRoutingModule } from './proposals-routing.module';
import { ProposalsMainComponent } from './proposals-main/proposals-main.component';
import { VoteProposalComponent } from './vote-proposal/vote-proposal.component';
import { CreateProposalComponent } from './create-proposal/create-proposal.component';

import { ToastrModule } from 'ngx-toastr';
import { AddressPipe } from 'src/app/shared/pipes/address/address.pipe';


@NgModule({
  declarations: [
    ProposalsMainComponent,
    VoteProposalComponent,
    CreateProposalComponent
  ],
  imports: [
    CommonModule,
    ProposalsRoutingModule,
    ReactiveFormsModule,

    NgxPopperModule.forRoot(),

    LayoutModule,
    ToastrModule.forRoot(),
    AddressPipe
  ]
})
export class ProposalsModule { }
