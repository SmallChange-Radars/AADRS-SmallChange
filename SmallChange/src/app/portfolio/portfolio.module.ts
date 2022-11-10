import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioPageComponent } from './portfolio-page/portfolio-page.component';
import { PortfolioTableComponent } from './portfolio-table/portfolio-table.component';
import { SummaryComponent } from './summary/summary.component';
import { AgGridModule } from 'ag-grid-angular';
import { NgChartsModule } from 'ng2-charts';
import { NgbdSortableHeader } from './portfolio-table/sortable.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PortfolioGraphComponent } from './portfolio-graph/portfolio-graph.component';
import { RoboAdvisorModule } from '../Robo/robo-advisor.module';




@NgModule({
  declarations: [
    PortfolioPageComponent,
    PortfolioTableComponent,
    SummaryComponent,
    NgbdSortableHeader,
    PortfolioGraphComponent
  ],
  imports: [
    CommonModule,
    AgGridModule,
    NgChartsModule,
    NgbModule,
    RoboAdvisorModule
    
  ],
  exports: [
    PortfolioPageComponent
  ]
})
export class PortfolioModule { }
