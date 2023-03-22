import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutModule } from 'src/app/layout/layout.module';

import { TreasuryRoutingModule } from './treasury-routing.module';
import { TreasuryComponent } from './treasury.component';
import { DropdownComponent } from './(internal)/dropdown/dropdown.component';

@NgModule({
  declarations: [
    TreasuryComponent,
    DropdownComponent
  ],
  imports: [
    CommonModule,
    TreasuryRoutingModule,

    LayoutModule
  ]
})
export class TreasuryModule { }
