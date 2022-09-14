import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Client } from '../shared/models/client';
import { ClientIdentification } from '../shared/models/client-identification';
import { RegisterUserService } from '../shared/services/register-user.service';
import { UpverifyService } from '../shared/services/upverify.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  registerForm: any;
  user: any;
  // getuser:any;
  pushedUser: any;
  identity: ClientIdentification = new ClientIdentification('', '');
  client: Client = new Client('', '', '', '', '', [this.identity]);
  passwordErrorTextmsg: string = "Invalid Password - Must contain between 6 and 18 letters, numbers, underscores or hyphens.";

  constructor(private formBuilder: FormBuilder, private logservice: UpverifyService, private service: RegisterUserService, private router: Router, private userClient: UserService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      identification: ['', [
        Validators.required
      ]],
      email: ['', [
        Validators.required,
        Validators.email,
        this.service.emailValidator()
      ]],
      password: ['', [
        Validators.required,
        Validators.pattern('^(?=.*[0-9])(?=.*[-_])[a-zA-Z0-9-_]{6,18}$')
      ]],
      country: ['', [Validators.required]],
      pincode: [[Validators.required]],
      firstName: [''],
      lastName: [''],
      dob: ['']
    });
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }


  onSubmit() {
    if (this.registerForm.valid) {
      this.pushUser();
      console.log("Form Submitted");
      console.log(this.registerForm.value);

      this.user.addUser(this.client.clientId);
      this.router.navigate(['/home']);

      this.registerForm.reset();
    } else {
      console.log("Form not submitted");
    }
  }

  pushUser() {
    if (this.registerFormControl.country.value.toLowerCase() == 'usa') {
      this.identity.type = 'SSN';
    } else {
      this.identity.type = 'Passport';
    }
    this.client.clientId = "1";
    this.client.dateOfBirth = this.registerForm.value.dob;
    this.client.country = this.registerForm.value.country;
    this.client.email = this.registerForm.value.email;
    this.identity.value = this.registerForm.value.identification;
    let email = this.client.email;
    let cl = this.client;
    this.user = { email: cl };
    this.service.pushUser(this.user).subscribe(data => this.pushedUser = data);
    console.log(this.pushedUser);
  }
}
