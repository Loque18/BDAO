import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponent } from './pages/test/test.component';
import { VoteProposalComponent } from './pages/vote-proposal/vote-proposal.component';
import { CreateProposalComponent } from './pages/create-proposal/create-proposal.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    VoteProposalComponent,
    CreateProposalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
