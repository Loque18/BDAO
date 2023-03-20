import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from './pages/test/test.component';

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

	{
		path: 'proposals',
		loadChildren: () =>
			import('src/app/pages/proposals/proposals.module').then((m) => m.ProposalsModule),
	},

	{
		path: 'test',
		component: TestComponent,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
