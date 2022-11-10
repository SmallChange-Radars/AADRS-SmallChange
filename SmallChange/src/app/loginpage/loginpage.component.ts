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

  errorMessage: string = '';

  //Storing token as cookie
  // public token: Token= new Token("",[""],"","");
  private token?: Token;
  public accessToken: string = '';

  constructor(private service: UpverifyService, private router: Router, private user: UserService, private cookieService: CookieService) { }

  @ViewChild('selfClosingAlert', { static: false })
  selfClosingAlert: NgbAlert | undefined;


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
    this.service.verifyCredentials(this.login).subscribe({
      next: (data) => {
        this.token = data;
        this.accessToken = this.token.accessToken.toString();
        this.user.addUser(this.accessToken);
        console.log(this.user.getUser());
        console.log(this.user.isLoggedIn());
      },
      error: (e) => { this._success.next(e); this.login = new Login("", ""); this.user.removeUser(); }
    });
  }
}
