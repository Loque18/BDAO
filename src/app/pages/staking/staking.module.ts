import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ReactiveFormsModule} from '@angular/forms';

import { LayoutModule } from 'src/app/layout/layout.module';

import { StakingRoutingModule } from './staking-routing.module';
import { StakingComponent } from './staking.component';


@NgModule({
  declarations: [
    StakingComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StakingRoutingModule,

    LayoutModule,
  ]
})
export class StakingModule { }
