import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginpageComponent } from './loginpage.component';



@NgModule({
  declarations: [LoginpageComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
    LoginpageComponent
  ]
})
export class LoginpageModule { }
