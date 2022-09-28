import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  navbarOpen = false;
  public clicked = false;
  _el: any;
  constructor(private user: UserService, private router: Router) {}

  ngOnInit(): void {}

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  logOut() {
    this.user.removeUser();
    this.router.navigate(['/']);
  }

  login() {
    this.router.navigate(['/login']);
  }

  register() {
    this.router.navigate(['/register']);
  }

  isLoggedIn() {
    return this.user.isLoggedIn();
  }

  prefer() {
    this.user.removeUser();
    this.router.navigate(['/preferences']);
  }
}
