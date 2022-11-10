import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ColumnApi, GridApi, GridReadyEvent, RefreshCellsParams } from 'ag-grid-community';
import { Activity } from 'src/app/shared/models/activity';
import { UserActivity } from 'src/app/shared/models/user-activity';
import { ActivityService } from 'src/app/shared/services/activity.service';
import { UserService } from 'src/app/shared/services/user.service';
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
  collectionSize : number = 0;
  category = "";
  searchText = "";
  direction = 'DESC';
  column = 'timestamp';
  @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
        this.direction=direction;
        this.column=column;
      }
    });
    this.activityService.getActivityHistory(this.searchText, this.category,this.column,this.direction,this.page, this.pageSize ).subscribe({
      next: (response) => {
        this.rowData=response?.body!;
        this.collectionSize = +response.headers.get('X-Total-Count')!;
      },
      error: (e) => {
        console.log(e);
        this.user.removeUser();
      }
    }
    );
  }
  
  rowData: Activity[] = [];
  temp: Activity[]=[];
  constructor(private activityService: ActivityService,private user:UserService) { }
  ngOnInit(): void {
    this.getAllActivity();
  }

  getAllActivity(){
    this.activityService.getActivityHistory(this.searchText, this.category,this.column, this.direction, this.page, this.pageSize).subscribe({
      next: (response) => {
        this.rowData=response?.body!;
        this.collectionSize = +response.headers.get('X-Total-Count')!;
      },
      error: (e) => {
        console.log(e);
        this.user.removeUser();
      }
    }
    );
  }

  onChange(){
    this.searchText=this.searchText.toUpperCase();
    this.getAllActivity();
  }

  changePagesize(size: number) {
    this.pageSize = size;
    this.onChange();
  }

  changeCategory(category: string) {
    this.category = category;
    this.onChange();
  }

}
