import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { SellComponent } from './sell/sell.component';
import { RentComponent } from './rent/rent.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ThankuComponent } from './thanku/thanku.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    SellComponent,
    RentComponent,
    ThankuComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: '', component: LandingComponent },
      { path: 'quiero-vender', component: SellComponent },
      { path: 'quiero-rentar', component: RentComponent },
      { path: '**', redirectTo: '' }
    ])
  ],
  exports: [RouterModule],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
