import { Component, OnInit } from '@angular/core';
import { Activity } from 'src/app/shared/models/activity';
import { UserActivity } from 'src/app/shared/models/user-activity';
import { ActivityService } from 'src/app/shared/services/activity.service';

@Component({
  selector: 'app-activity-page',
  templateUrl: './activity-page.component.html',
  styleUrls: ['./activity-page.component.scss']
})
export class ActivityPageComponent implements OnInit {

  activity: Activity[]=[];
  userActivity: UserActivity=new UserActivity("",[]);

  constructor(private activityService: ActivityService) { }

  ngOnInit(): void {
    //this.getAllActivity();
  }



}
