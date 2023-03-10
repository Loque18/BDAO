import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: 'treasury',
		loadChildren: () =>
			import('src/app/pages/treasury/treasury.module').then((m) => m.TreasuryModule),
	},
	{
		path: 'staking',
		loadChildren: () =>
			import('src/app/pages/staking/staking.module').then((m) => m.StakingModule),
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
