import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LandingNavComponent } from './landing-nav/landing-nav.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    LandingPageComponent,
    LandingNavComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [
    LandingNavComponent
  ]
})
export class LandingModule { }
