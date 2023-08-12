import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { SellComponent } from './sell/sell.component';
import { BuyComponent } from './buy/buy.component';
import { WhatsComponent } from './whats/whats.component';

@NgModule({
  declarations: [
    AppComponent,
    SellComponent,
    WhatsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: '', component: LandingComponent },
      { path: 'quiero-vender', component: SellComponent },
      { path: 'quiero-rentar', component: BuyComponent },
      { path: '**', redirectTo: '' }
    ])
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
