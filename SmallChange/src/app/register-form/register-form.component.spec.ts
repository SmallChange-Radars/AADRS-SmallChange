import { ComponentFixture, TestBed } from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing'

import { RegisterFormComponent } from './register-form.component';

describe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterFormComponent],
      imports: [FormsModule,
        ReactiveFormsModule,
      HttpClientTestingModule]
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
    const pinCtrl = component.registerForm.get('country');
    expect(component.registerForm.valid).toBeFalsy(); 
    expect(emailctrl?.hasError('required')).toBeTruthy(); 
    expect(passwordCtrl?.hasError('required')).toBeTruthy(); 
    emailctrl?.setValue('email@email.com'); 
    passwordCtrl?.setValue('amrutha-1');
    idenCtrl?.setValue('email@email.com'); 
    countryCtrl?.setValue('me password'); 
    pinCtrl?.setValue(233456);
    expect(component.registerForm.valid).toBeTruthy(); });
});
