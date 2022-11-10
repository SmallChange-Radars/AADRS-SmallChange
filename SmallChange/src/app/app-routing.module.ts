import { Injectable, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterModule, RouterStateSnapshot, Routes, UrlTree } from '@angular/router';
import { LandingPageComponent } from './Landing/landing-page/landing-page.component';
import { ActivityPageComponent } from './activity/activity-page/activity-page.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { NavTabComponent } from './nav-tab/nav-tab.component';
import { PortfolioPageComponent } from './portfolio/portfolio-page/portfolio-page.component';
import { PreferencesPageComponent } from './preferences/preferences-page/preferences-page.component';
import { TradeListComponent } from './trade/trade-list/trade-list.component';
import { UserService } from './shared/services/user.service';
import { Observable } from 'rxjs';

@Injectable()
class OnlyLoggedInUsersGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) { };
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.userService.isLoggedIn()) {
      return true;
    } else {
      this.userService.redirectUrl = state.url;
      this.router.navigate(['/login']);
      return false;
    }
  }
}

@Injectable()
class NotLoggedInUsersGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) { };
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (!this.userService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}

const routes: Routes = [
  {
    path: 'home',
    canActivate: [OnlyLoggedInUsersGuard],
    component: PortfolioPageComponent
  },
  {
    path: 'login',
    canActivate: [NotLoggedInUsersGuard],
    component: LoginpageComponent
  },
  {
    path: 'register',
    canActivate: [NotLoggedInUsersGuard],
    component: NavTabComponent
  },
  {
    path: 'preferences',
    canActivate: [OnlyLoggedInUsersGuard],
    component: PreferencesPageComponent
  },
  {
    path: 'trade',
    canActivate: [OnlyLoggedInUsersGuard],
    component: TradeListComponent
  },
  {
    path: 'activity',
    canActivate: [OnlyLoggedInUsersGuard],
    component: ActivityPageComponent
  },
  {
    path: '',
    component: LandingPageComponent,
    canActivate: [NotLoggedInUsersGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  providers: [
    OnlyLoggedInUsersGuard,
    NotLoggedInUsersGuard
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
