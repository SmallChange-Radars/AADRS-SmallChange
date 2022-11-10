import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, switchMap } from 'rxjs';
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
  registerForm: any = new FormGroup({});
  identity: ClientIdentification= new ClientIdentification("","");
  passwordErrorTextmsg: string = "Invalid Password - Must contain between 6 and 18 letters, numbers, underscores or hyphens.";
  private _success = new Subject<string>();
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder,
              private service: RegisterUserService, 
              private router: Router ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      identification: ['', [
        Validators.required
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.pattern('^(?=.*[0-9])(?=.*[-_])[a-zA-Z0-9-_]{6,18}$')
      ]],
      country: ['', [Validators.required]],
      pincode: ['',[Validators.required]],
      firstName: [''],
      lastName: [''],
      dob: ['']
    });

    this._success.subscribe(message => this.errorMessage = message);

    
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }


  onSubmit() {
    if (this.registerForm.valid) {
      this.identity.type= this.registerFormControl.country.value.toLowerCase() === 'usa' ? 'SSN': 'Passport';
    this.identity.value = this.registerForm.value.identification;
    let registerFormValue = this.registerForm.value;
    let client:Client = new Client('', registerFormValue.email, registerFormValue.dob, registerFormValue.country, registerFormValue.pincode, [this.identity],registerFormValue.password,'',20.00,'','ROLE_CLIENT');
    this.service.pushUser(client).subscribe({
      next: (data) => { console.log("Posted");alert("Registered Successfully! Please fill Account Details"); this.registerForm.reset();},
      error: (e) => {this._success.next(e); }
    });
      
      console.log(this.registerForm.value);

    } else {
      console.log("Form not submitted");
    }
  }

  hide : boolean = true;

  passwordVisibilty() {
    this.hide = !this.hide;
  }
}
