import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from './core/core.module';
import { AgGridModule } from 'ag-grid-angular';
import { NgChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RegisterFormComponent } from './register-form/register-form.component';

import { LoginpageModule } from './loginpage/loginpage.module';
import { PreferencesModule } from './preferences/preferences.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { ActivityPageComponent } from './activity/activity-page/activity-page.component';
import { ActivityTableComponent } from './activity/activity-table/activity-table.component';

@NgModule({
  declarations: [
    AppComponent,    
    LandingPageComponent,
    RegisterFormComponent,
    ActivityPageComponent,
    ActivityTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    PreferencesModule,
    PortfolioModule,
    LoginpageModule,
    CoreModule,
    AgGridModule,
    NgChartsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
