import { Component, Input, OnInit } from '@angular/core';
import { ColumnApi, GridApi, GridReadyEvent } from 'ag-grid-community';
import { ClientPortfolio } from '../../shared/models/client-portfolio';


@Component({
  selector: 'app-portfolio-table',
  templateUrl: './portfolio-table.component.html',
  styleUrls: ['./portfolio-table.component.scss']
})

export class PortfolioTableComponent implements OnInit {
  sum: any = 0;
  c: any
  @Input() cp: ClientPortfolio[] = [];
  private gridApi!: GridApi<ClientPortfolio>;
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

  posOrNeg(params: any) {
    if (params.node.data.prof >= 0) {
      return { color: 'green', textAlign: 'right' };
    } else {
      // console.log(params.node);
      return { color: 'red', textAlign: 'right' };

    }
  }

  defaultColDef = { suppressSizeToFit: false, resizeable: true, sortable: true}


  columnDefs = [
    { headerName: 'Name', field: 'name'},
    { headerName: 'Shares', field: 'qty'},
    { headerName: 'Price', field: 'price', headerClass: 'ag-right-aligned-header', cellRenderer: this.toUSD, cellStyle: { textAlign: 'right' } },
    { headerName: 'Value', field: 'value', headerClass: 'ag-right-aligned-header', cellRenderer: this.toUSD, cellStyle: { textAlign: 'right' } },
    { headerName: 'Gains', field: 'prof', headerClass: 'ag-right-aligned-header', cellRenderer: this.toUSD, cellStyle: this.posOrNeg },
    { headerName: 'Returns', field: 'percent', headerClass: 'ag-right-aligned-header', cellRenderer: this.toPercentage, cellStyle: this.posOrNeg }
  ];

  rowData: ClientPortfolio[] = [];

  constructor() { }

  onGridReady(params: GridReadyEvent<ClientPortfolio>) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.rowData = this.cp;
    this.sizeToFit();
  }

  ngOnInit(): void {
  }


}
