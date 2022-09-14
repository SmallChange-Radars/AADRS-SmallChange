import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Client } from '../shared/models/client';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  registerationForm: any;
  client?: Client;
  pass?:string;
  passwordErrorTextmsg:string = "Invalid Password - Must contain between 6 and 24 letters, numbers, underscores or hyphens.";
  
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registerationForm = this.formBuilder.group({
      identification: ['', [
        Validators.required
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required, 
        Validators.pattern('^(?=.*[0-9])(?=.*[-_])[a-zA-Z0-9-_]{3,18}$')
      ]],
      country: ['',[Validators.required]],
      pincode: ['', [Validators.required]]
    });
  }

  get password() {
    return this.registerationForm.get('password');
  }

  get email(){
    return this.registerationForm.get('email');
  }

  get pincode(){
    return this.registerationForm.get('pincode');
  }

  get country(){
    return this.registerationForm.get('country');
  }

  get identification(){
    return this.registerationForm.get('identification');
  }

  onSubmit(){
    if(this.registerationForm.valid){
      console.log("Form Submitted");
    } else {
      console.log("Form not submitted");
    }
  }

}
