import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginpageModule } from './loginpage/loginpage.module';
import { PreferencesModule } from './preferences/preferences.module';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { PortfolioTableComponent } from './portfolio-table/portfolio-table.component';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    RegisterFormComponent,
    PortfolioComponent, 
    PortfolioTableComponent
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
