import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { NavTabComponent } from './nav-tab/nav-tab.component';
import { PortfolioPageComponent } from './portfolio/portfolio-page/portfolio-page.component';
import { PreferencesPageComponent } from './preferences/preferences-page/preferences-page.component';
import { RegisterFormComponent } from './register-form/register-form.component';

const routes: Routes = [
  {
    path: 'home',
    component: PortfolioPageComponent
  },
  {
    path: 'register',
    component: RegisterFormComponent
  },
  {
    path: 'preferences',
    component: PreferencesPageComponent
  },
  {
    path: 'trade',
    component: LoginpageComponent
  },
  {
    path: 'activity',
    component: NavTabComponent
  },
  {
    path: '',
    component: LandingPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
