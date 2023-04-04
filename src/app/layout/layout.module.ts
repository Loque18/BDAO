import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './main/main.component';

import { ConnectBtnComponent } from '../components/internal/connect-btn/connect-btn.component';

@NgModule({
	declarations: [
		HeaderComponent,
		MainComponent,
		
	],
	imports: [
		CommonModule,
		ConnectBtnComponent,
		RouterModule,
	],
	exports: [
		MainComponent
	],
})
export class LayoutModule {}
