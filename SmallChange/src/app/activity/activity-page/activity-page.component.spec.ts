import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivityService } from 'src/app/shared/services/activity.service';

import { ActivityPageComponent } from './activity-page.component';

describe('ActivityPageComponent', () => {
  let component: ActivityPageComponent;
  let fixture: ComponentFixture<ActivityPageComponent>;

  beforeEach(async () => {
    let activityService: any = jasmine.createSpyObj('ActivityService', [
      'getPortfolio',
    ]);
    await TestBed.configureTestingModule({
      declarations: [ ActivityPageComponent ],
      providers: [{ provide: ActivityService, useValue: activityService }],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
