import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ColumnApi, GridApi, GridReadyEvent, RefreshCellsParams } from 'ag-grid-community';
import { Activity } from 'src/app/shared/models/activity';
import { UserActivity } from 'src/app/shared/models/user-activity';
import { ActivityService } from 'src/app/shared/services/activity.service';
import { NgbdSortableHeader, SortEvent } from './sortable.directive';

@Component({
  selector: 'app-activity-table',
  templateUrl: './activity-table.component.html',
  styleUrls: ['./activity-table.component.scss']
})
export class ActivityTableComponent implements OnInit {

  sum: any = 0;
  c: any;
  act: Activity[]=[];
  activity: UserActivity = new UserActivity("",this.act);
  page = 1;
  pageSize = 10;
  collectionSize = 200;
  
  @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
  }
  
  

  rowData: Activity[] = [];
  temp: Activity[]=[];
  constructor(private activityService: ActivityService) { }

  

  ngOnInit(): void {
    this.getAllActivity();
  }

  getAllActivity(){
    this.activityService.getActivityHistory().subscribe(
      (data)=>{
        this.activity=data;
        console.log(this.activity.value);
        this.temp=this.activity.value;
        //this.temp.sort((a,b)=>a.Date.toLocaleString().localeCompare(b.Date.toLocaleString()));
        this.temp.reverse();
        this.rowData = this.temp;
      }
    );
  }

}
