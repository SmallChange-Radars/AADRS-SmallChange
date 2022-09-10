import { Component } from '@angular/core';

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
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
}
