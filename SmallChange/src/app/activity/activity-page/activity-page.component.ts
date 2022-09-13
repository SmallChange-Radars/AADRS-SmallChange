import { Component, OnInit } from '@angular/core';
import { Activity } from 'src/app/shared/models/activity';
import { ActivityService } from 'src/app/shared/services/activity.service';

@Component({
  selector: 'app-activity-page',
  templateUrl: './activity-page.component.html',
  styleUrls: ['./activity-page.component.scss']
})
export class ActivityPageComponent implements OnInit {

  activity: Activity[]=[];

  constructor(private activityService: ActivityService) { }

  ngOnInit(): void {
    this.getAllActivity();
  }

  getAllActivity(){
    this.activityService.getActivityHistory().subscribe(
      (data)=>{
        this.activity=data;
        console.log(this.activity);
      }
    );
  }

}
