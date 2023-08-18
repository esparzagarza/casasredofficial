import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LandingComponent } from './landing/pages/home/landing.component';
import { FooterComponent } from './landing/layout/footer/footer.component';
import { SellComponent } from './landing/pages/sell/sell.component';
import { RentComponent } from './landing/pages/rent/rent.component';
import { ThankuComponent } from './landing/pages/thanku/thanku.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    SellComponent,
    RentComponent,
    FooterComponent,
    ThankuComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: '', component: LandingComponent },
      { path: 'gracias', component: ThankuComponent },
      { path: 'quiero-vender-mi-propiedad', component: SellComponent },
      { path: 'quiero-rentar-mi-propiedad', component: RentComponent },
      {
        path: '**', redirectTo: ''
      }
    ])
  ],
  exports: [RouterModule],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
