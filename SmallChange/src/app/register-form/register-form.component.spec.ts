import { ComponentFixture, TestBed } from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing'

import { RegisterFormComponent } from './register-form.component';
import { Router } from '@angular/router';
import { Client } from '../shared/models/client';
import { RegisterUserService } from '../shared/services/register-user.service';

describe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;
  let router: Router;
  let registerService: any = jasmine.createSpyObj('RegisterUserService', ['getUsers', 'pushUser']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterFormComponent],
      imports: [FormsModule,
        ReactiveFormsModule,
      HttpClientTestingModule],
      providers: [{ provide: Router, useValue: router },
        { provide: RegisterUserService, useValue: registerService }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate content', () => { 
    const emailctrl = component.registerForm.get('email'); 
    const passwordCtrl = component.registerForm.get('password');
    const idenCtrl = component.registerForm.get('identification');
    const countryCtrl = component.registerForm.get('country');
    const pinCtrl = component.registerForm.get('pincode');
    expect(component.registerForm.valid).toBeFalsy(); 
    expect(emailctrl?.hasError('required')).toBeTruthy(); 
    expect(passwordCtrl?.hasError('required')).toBeTruthy(); 
    emailctrl?.setValue('email@email.com'); 
    passwordCtrl?.setValue('amrutha-1');
    idenCtrl?.setValue('pass'); 
    countryCtrl?.setValue('us'); 
    pinCtrl?.setValue("233456");
    expect(component.registerForm.valid).toBeTruthy(); 
  });

  it('should submit form',()=>{
    const emailctrl = component.registerForm.get('email'); 
    const passwordCtrl = component.registerForm.get('password');
    const idenCtrl = component.registerForm.get('identification');
    const countryCtrl = component.registerForm.get('country');
    const pinCtrl = component.registerForm.get('pincode');
    emailctrl?.setValue('email@email.com'); 
    passwordCtrl?.setValue('amrutha-1');
    idenCtrl?.setValue('pass'); 
    countryCtrl?.setValue('us'); 
    pinCtrl?.setValue("233456");
    
    expect(component.registerForm.get('email').value).toBe("email@email.com");
  });
});
