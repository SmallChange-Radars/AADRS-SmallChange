import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { LandingNavComponent } from './landing-nav.component';

describe('LandingNavComponent', () => {
  let component: LandingNavComponent;
  let fixture: ComponentFixture<LandingNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LandingNavComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingNavComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
