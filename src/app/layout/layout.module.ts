import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './main/main.component';

@NgModule({
	declarations: [
		HeaderComponent,
		MainComponent
	],
	imports: [
		CommonModule
	],
	exports: [
		MainComponent
	],
})
export class LayoutModule {}
