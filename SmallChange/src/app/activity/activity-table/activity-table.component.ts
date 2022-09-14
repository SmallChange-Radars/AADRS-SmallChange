import { Component, Input, OnInit } from '@angular/core';
import { ColumnApi, GridApi, GridReadyEvent, RefreshCellsParams } from 'ag-grid-community';
import { Activity } from 'src/app/shared/models/activity';
import { UserActivity } from 'src/app/shared/models/user-activity';
import { ActivityService } from 'src/app/shared/services/activity.service';

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
  private gridApi!: GridApi<Activity>;
  private temp!: GridReadyEvent<Activity>;
  private gridColumnApi!: ColumnApi;
  
  sizeToFit() {
    this.gridApi.sizeColumnsToFit();
  }
  

  toUSD(params: any) {
    var inrFormat = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    });
    return inrFormat.format(params.value);
  }

  toPercentage(params: any) {
    var inrFormat = new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    return inrFormat.format(params.value / 100);
  }

  toDate(params: any){
    return new Date(params.value).toLocaleString();
  }


  defaultColDef = { suppressSizeToFit: false, resizeable: true, sortable: true}


  columnDefs = [
    { headerName: 'Symbol', field: 'Stock'},
    { headerName: 'Quantity', field: 'Quantity'},
    { headerName: 'Price', field: 'Price', cellRenderer: this.toUSD},
    { headerName: 'Buy/Sell', field: 'Type'},
    { headerName: 'Date', field: 'Date' ,cellRenderer: this.toDate},
  ];

  rowData: Activity[] = [];

  constructor(private activityService: ActivityService) { }

  onGridReady(params: GridReadyEvent<Activity>) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    
    this.sizeToFit();
  }

  ngOnInit(): void {
    this.getAllActivity();
  }

  getAllActivity(){
    this.activityService.getActivityHistory().subscribe(
      (data)=>{
        this.activity=data;
        this.rowData = this.activity.value;
      }
    );
  }

}
