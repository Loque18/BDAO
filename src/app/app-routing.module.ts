import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: 'treasury',
		loadChildren: () =>
			import('src/app/pages/treasury/treasury.module').then((m) => m.TreasuryModule),
	},
	
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
