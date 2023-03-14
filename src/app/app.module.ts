import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProposalsComponent } from './pages/proposals/proposals.component';
import { VoteProposalComponent } from './pages/vote-proposal/vote-proposal.component';

@NgModule({
  declarations: [
    AppComponent,
    ProposalsComponent,
    VoteProposalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
