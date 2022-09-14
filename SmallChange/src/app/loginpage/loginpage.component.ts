import { Component, OnInit } from '@angular/core';
import { Login } from '../shared/models/login';
import { UpverifyService } from 'src/app/shared/services/upverify.service';
import { Router } from '@angular/router';

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

  constructor(private service: UpverifyService, private router: Router) { }

  ngOnInit(): void { }

  close() {
    this.errorMessage = [];
  }

  verifyCredentials() {
    this.service.verifyCredentials(this.login.id, this.login.password).subscribe({
      next: (data) => {
        this.loginReturn = data;
        if (this.loginReturn.password.length === this.login.password.length) {
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
