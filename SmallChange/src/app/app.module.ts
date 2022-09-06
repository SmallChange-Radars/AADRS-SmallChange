import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from './core/core.module';
import { PreferencesModule } from './preferences/preferences.module';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { PortfolioTableComponent } from './portfolio-table/portfolio-table.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginpageComponent,
    PortfolioComponent,
    PortfolioTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    CoreModule,
    PreferencesModule
    LoginpageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
