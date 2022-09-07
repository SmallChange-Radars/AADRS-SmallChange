import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { LoginpageComponent } from './loginpage/loginpage.component';
// import { LoginpageComponent } from './loginpage/loginpage.component';
// import { LoginpageModule } from './loginpage/loginpage.module';
import { LoginpageModule } from './loginpage/loginpage.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from './core/core.module';
import { PortfolioPageComponent } from './portfolio/portfolio-page/portfolio-page.component';
import { PortfolioTableComponent } from './portfolio/portfolio-table/portfolio-table.component';

@NgModule({
  declarations: [
    AppComponent,
    // LoginpageComponent,
    PortfolioPageComponent,
    PortfolioTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    CoreModule,
    LoginpageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
