import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProposalsRoutingModule } from './proposals-routing.module';

import { LayoutModule } from 'src/app/layout/layout.module';

import { ProposalsComponent } from './proposals.component';


@NgModule({
  declarations: [
    ProposalsComponent
  ],
  imports: [
    CommonModule,
    ProposalsRoutingModule,

    LayoutModule,
  ]
})
export class ProposalsModule { }
