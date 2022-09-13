import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityPageComponent } from './activity/activity-page/activity-page.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
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
    component: ActivityPageComponent
  },
  {
    path: '',
    component: LoginpageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
