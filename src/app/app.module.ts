import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ValidateTokenGuard } from './guards/validate-token.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LandingComponent } from './landing/pages/home/landing.component';
import { FooterComponent } from './landing/layout/footer/footer.component';
import { SellComponent } from './landing/pages/sell/sell.component';
import { RentComponent } from './landing/pages/rent/rent.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    SellComponent,
    RentComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: '', component: LandingComponent },
      { path: 'quiero-vender-mi-propiedad', component: SellComponent },
      { path: 'quiero-rentar-mi-propiedad', component: RentComponent },
      {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
      },
      {
        path: 'suscriptores',
        canLoad: [ValidateTokenGuard],
        loadChildren: () => import('./subscribers/subscribers.module').then(m => m.SubscribersModule)
      },
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
