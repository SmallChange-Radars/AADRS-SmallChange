import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginpageModule } from './loginpage/loginpage.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PortfolioPageComponent } from './portfolio/portfolio-page/portfolio-page.component';
import { PortfolioTableComponent } from './portfolio/portfolio-table/portfolio-table.component';

import { LandingPageComponent } from './landing-page/landing-page.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PreferencesModule } from './preferences/preferences.module';
import { CoreModule } from './core/core.module';
import { NavTabComponent } from './nav-tab/nav-tab.component';

@NgModule({
  declarations: [
    AppComponent,    
    LandingPageComponent,
    RegisterFormComponent,
    PortfolioPageComponent,
    PortfolioTableComponent,
    NavTabComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    PreferencesModule,
    LoginpageModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
