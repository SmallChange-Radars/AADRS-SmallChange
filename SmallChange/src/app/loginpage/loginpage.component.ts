import { Component, OnInit } from '@angular/core';
import { Login } from '../shared/models/login';
import { UpverifyService } from 'src/app/shared/services/upverify.service';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.scss'],
})
export class LoginpageComponent implements OnInit {
  public login: Login = new Login('', '');

  public loginReturn: Login = new Login('', '');
  errorMessage: string[] = [];
  errorType: string = "danger";

  constructor(private service: UpverifyService, private router: Router, private user: UserService) { }

  ngOnInit(): void {
  }

  loginF(){
    this.router.navigate(['/login']);
  }

  register(){
    this.router.navigate(['/register']);
  }

  close() {
    this.errorMessage = [];
  }

  verifyCredentials() {
    this.service.verifyCredentials(this.login.id, this.login.password).subscribe({
      next: (data) => {
        this.loginReturn = data;
        if (this.loginReturn.password === this.login.password) {
          this.service.getDetails(this.login.id).subscribe({
            next: (data) => {
              this.user.addUser(data[0].clientId);
              console.log(data)
              console.log(data[0].clientId,this.user.getUser(),this.user.isLoggedIn());
            }});
          this.router.navigate(['/home']);
        }
        else {
          this.errorMessage = ["Incorrect Password"];
          this.login = new Login(this.login.id, "");
        }
      },
      error: (e) => { this.errorMessage = [e]; this.login = new Login("", ""); }
    });
  }
}
