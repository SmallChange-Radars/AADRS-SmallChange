import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SmallChange';
  navbarOpen = false;
  public clicked = false;
  _el: any;
  constructor(private user:UserService,private router:Router){}
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  logOut(){
    this.user.removeUser();
    console.log(this.user.getUser());
    console.log(this.user.isLoggedIn());
  }

  login(){
    this.router.navigate(['/login']);
  }

  register(){
    this.router.navigate(['/register']);
  }

  isLoggedIn(){
    return this.user.isLoggedIn();
  }

  prefer(){
    this.user.removeUser();
    this.router.navigate(['/preferences']);
  }
}
