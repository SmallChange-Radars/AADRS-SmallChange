import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvestmentPreferences } from 'src/app/shared/models/investment-preferences';

import { PreferencesPageComponent } from './preferences-page.component';

@Component({
  selector: 'app-preferences-form',
  template: 'Mock Preferences Form',
})
class MockPreferencesFormComponent {}
describe('PreferencesPageComponent', () => {
  let component: PreferencesPageComponent;
  let fixture: ComponentFixture<PreferencesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreferencesPageComponent, MockPreferencesFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferencesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
