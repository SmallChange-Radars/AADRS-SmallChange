import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginpageModule } from './loginpage/loginpage.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PreferencesModule } from './preferences/preferences.module';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { PortfolioTableComponent } from './portfolio-table/portfolio-table.component';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [AppComponent, PortfolioComponent, PortfolioTableComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    PreferencesModule,
    LoginpageModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
