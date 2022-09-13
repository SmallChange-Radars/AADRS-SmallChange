import { Component, Input, OnInit } from '@angular/core';
import { ColumnApi, GridApi, GridReadyEvent } from 'ag-grid-community';
import { Activity } from 'src/app/shared/models/activity';

@Component({
  selector: 'app-activity-table',
  templateUrl: './activity-table.component.html',
  styleUrls: ['./activity-table.component.scss']
})
export class ActivityTableComponent implements OnInit {

  sum: any = 0;
  c: any
  @Input() activity: Activity[] = [];
  private gridApi!: GridApi<Activity>;
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


  defaultColDef = { suppressSizeToFit: false, resizeable: true, sortable: true}


  columnDefs = [
    { headerName: 'Name', field: 'stock.name'},
    { headerName: 'Symbol', field: 'stock.symbol'},
    { headerName: 'Quantity', field: 'quantity'},
    { headerName: 'Price', field: 'price', cellRenderer: this.toUSD},
    { headerName: 'Buy/Sell', field: 'typeOfTransaction'},
    { headerName: 'Date', field: 'time'},
  ];

  rowData: Activity[] = [];

  constructor() { }

  onGridReady(params: GridReadyEvent<Activity>) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.rowData = this.activity;
    this.sizeToFit();
  }

  ngOnInit(): void {
  }

}
