import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { ModalModule } from './shared/modal/modal.module';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponent } from './pages/test/test.component';


import { WalletsComponent } from './components/modals/wallets/wallets.component';


@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    WalletsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot(),

    ModalModule,

    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
