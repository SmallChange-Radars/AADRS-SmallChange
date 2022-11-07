import { Component, OnInit, ViewChild } from '@angular/core';
import { Login } from '../shared/models/login';
import { UpverifyService } from 'src/app/shared/services/upverify.service';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, Subject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { TokenService } from '../shared/services/token.service';
import { Token } from '../shared/models/token';

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

  //Storing token as cookie
  // public token: Token= new Token("",[""],"","");
  private token?:Token;
  public accessToken: string = '';

  constructor(private tokenService: TokenService, private service: UpverifyService, private router: Router, private user: UserService, private cookieService: CookieService) { }

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
    this.tokenService.postUserLogin(this.login).subscribe(response => {
      console.log(response);
      this.token = response;
      console.log(typeof(this.token.accessToken));
      this.accessToken = this.token.accessToken.toString();
      this.cookieService.set("accessToken",this.accessToken);
      this.user.addUser(this.accessToken);
    });
    console.log("Getting a cookie:", this.cookieService.get("accessToken"));

    this.service.verifyCredentials(this.login.email, this.login.password).subscribe({
      next: (data) => {
        this.loginReturn = data;
        if (this.loginReturn.password === this.login.password) {
          this.service.getDetails(this.login.email).subscribe({
            next: (data) => {
              this.user.addUser(data[0].clientId);
              console.log(data)
              console.log(data[0].clientId, this.user.getUser(), this.user.isLoggedIn());
            }
          });

          //setting token as cookie on user login
          

          this.router.navigate(['/home']);
        }
        else {
          this._success.next("Invalid Credentials");
          this.login = new Login(this.login.email, "");
        }
      },
      error: (e) => { this._success.next(e);; this.login = new Login("", ""); }
    });
  }
}
