import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutModule } from 'src/app/layout/layout.module';

import { StakingRoutingModule } from './staking-routing.module';
import { StakingComponent } from './staking.component';


@NgModule({
  declarations: [
    StakingComponent
  ],
  imports: [
    CommonModule,
    StakingRoutingModule,

    LayoutModule,
  ]
})
export class StakingModule { }
