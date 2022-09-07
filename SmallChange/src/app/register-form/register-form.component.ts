import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  userForm: any;
  pass?:string;
  passwordErrorTextmsg:string = "Invalid Password - Must contain between 6 and 24 letters, numbers, underscores or hyphens.";
  
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
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
    return this.userForm.get('password');
  }

  get email(){
    return this.userForm.get('email');
  }

  get pincode(){
    return this.userForm.get('pincode');
  }

  get country(){
    return this.userForm.get('country');
  }

  get identification(){
    return this.userForm.get('identification');
  }

  onSubmit(){
    if(this.userForm.valid){
      console.log("Form Submitted");
    } else {
      console.log("Form not submitted");
    }
  }

}
