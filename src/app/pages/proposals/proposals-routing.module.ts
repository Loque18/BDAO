import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProposalComponent } from './create-proposal/create-proposal.component';
import { ProposalsMainComponent } from './proposals-main/proposals-main.component';
import { VoteProposalComponent } from './vote-proposal/vote-proposal.component';

const routes: Routes = [
	{
		path: '',
		component: ProposalsMainComponent,
	},
	{
		path: 'create',
		component: CreateProposalComponent,
	},
	{
		path: 'vote',
		component: VoteProposalComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ProposalsRoutingModule {}
