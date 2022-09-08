import { Component, OnInit } from '@angular/core';
import { Login } from '../shared/models/login';
import { UpverifyService } from 'src/app/shared/services/upverify.service';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.scss'],
})
export class LoginpageComponent implements OnInit {
  public login: Login = new Login('', '');

  constructor(private service: UpverifyService) {}

  ngOnInit(): void {}

  verifyCredentials() {
    console.log(
      this.service.verifyUSER(this.login.username, this.login.password)
    );
    this.login = new Login('', '');
  }
}
