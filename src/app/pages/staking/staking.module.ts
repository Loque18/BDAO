import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';

import {ReactiveFormsModule} from '@angular/forms';

import { LayoutModule } from 'src/app/layout/layout.module';

import { StakingRoutingModule } from './staking-routing.module';
import { StakingComponent } from './staking.component';

import { BigNumberPipe } from 'src/app/shared/pipes/big-number.pipe';


@NgModule({
  declarations: [
    StakingComponent,
    BigNumberPipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StakingRoutingModule,
    ToastrModule.forRoot(),

    LayoutModule,
  ]
})
export class StakingModule { }
