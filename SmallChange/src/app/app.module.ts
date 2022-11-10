import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from './core/core.module';
import { AgGridModule } from 'ag-grid-angular';
import { NgChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './Landing/landing-page/landing-page.component';
import { RegisterFormComponent } from './register-form/register-form.component';

import { LoginpageModule } from './loginpage/loginpage.module';
import { PreferencesModule } from './preferences/preferences.module';
import { NavTabComponent } from './nav-tab/nav-tab.component';
import { PortfolioModule } from './portfolio/portfolio.module';
import {HttpClientModule} from '@angular/common/http';
import { AccountFormComponent } from './account-form/account-form.component';
import { TradeModule } from './trade/trade.module';
import { ActivityPageComponent } from './activity/activity-page/activity-page.component';
import { ActivityTableComponent } from './activity/activity-table/activity-table.component';
import { BuySellModalComponent } from './shared/components/buy-sell-modal/buy-sell-modal.component';
import { NgbdSortableHeader } from './activity/activity-table/sortable.directive';
import { CookieService } from 'ngx-cookie-service';
import { LandingModule } from './Landing/landing.module';
import { RoboAdvisorModule } from './Robo/robo-advisor.module';

@NgModule({
  declarations: [
    AppComponent,
    RegisterFormComponent,
    NavTabComponent,
    ActivityPageComponent,
    ActivityTableComponent,
    AccountFormComponent,
    BuySellModalComponent,
    NgbdSortableHeader
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
    LandingModule,
    CoreModule,
    AgGridModule,
    NgChartsModule,
    HttpClientModule,
    TradeModule,
    NgChartsModule,
    RoboAdvisorModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
  entryComponents: [BuySellModalComponent],
})
export class AppModule {}
