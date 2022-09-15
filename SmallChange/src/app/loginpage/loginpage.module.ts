import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginpageComponent } from './loginpage.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from '../core/core.module';



@NgModule({
  declarations: [LoginpageComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    CoreModule
  ],
  exports: [
    LoginpageComponent
  ]
})
export class LoginpageModule { }
