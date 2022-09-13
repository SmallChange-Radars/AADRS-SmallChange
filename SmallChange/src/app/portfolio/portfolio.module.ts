import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioPageComponent } from './portfolio-page/portfolio-page.component';
import { PortfolioTableComponent } from './portfolio-table/portfolio-table.component';
import { SummaryComponent } from './summary/summary.component';
import { AgGridModule } from 'ag-grid-angular';
import { NgChartsModule } from 'ng2-charts';




@NgModule({
  declarations: [
    PortfolioPageComponent,
    PortfolioTableComponent,
    SummaryComponent
  ],
  imports: [
    CommonModule,
    AgGridModule,
    NgChartsModule
  ],
  exports: [
    PortfolioPageComponent
  ]
})
export class PortfolioModule { }
