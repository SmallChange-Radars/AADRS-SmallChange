import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';

import { TradeListComponent } from './trade-list/trade-list.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdSortableHeader } from './trade-list/sortable.directive';
import { RoboAdvisorModule } from '../Robo/robo-advisor.module';

@NgModule({
  declarations: [TradeListComponent,NgbdSortableHeader],
  imports: [
    CommonModule,
    HttpClientModule,
    AgGridModule,
    FormsModule,
    NgbModule,
    RoboAdvisorModule
  ],
  exports: [TradeListComponent],
  bootstrap: [TradeListComponent]
})
export class TradeModule {}
