import { Component, OnInit, ViewChild } from '@angular/core';
import { Login } from '../shared/models/login';
import { UpverifyService } from 'src/app/shared/services/upverify.service';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.scss'],
})
export class LoginpageComponent implements OnInit {
  private _success = new Subject<string>();
  public login: Login = new Login('', '');

  public loginReturn: Login = new Login('', '');
  errorMessage: string = '';

  constructor(private service: UpverifyService, private router: Router, private user: UserService) { }

  @ViewChild('selfClosingAlert', { static: false })
  selfClosingAlert: NgbAlert| undefined;
  

  ngOnInit(): void {

    this._success.subscribe(message => this.errorMessage = message);
    this._success.pipe(debounceTime(5000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });
  }

  loginF() {
    this.router.navigate(['/login']);
  }

  register() {
    this.router.navigate(['/register']);
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
              console.log(data[0].clientId, this.user.getUser(), this.user.isLoggedIn());
            }
          });
          this.router.navigate(['/home']);
        }
        else {
          this._success.next("Invalid Credentials");
          this.login = new Login(this.login.id, "");
        }
      },
      error: (e) => { this._success.next(e);; this.login = new Login("", ""); }
    });
  }
}
