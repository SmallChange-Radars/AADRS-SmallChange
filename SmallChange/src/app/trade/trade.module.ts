import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';

import { TradeListComponent } from './trade-list/trade-list.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TradeListComponent],
  imports: [CommonModule, HttpClientModule, AgGridModule, FormsModule],
  exports: [TradeListComponent],
})
export class TradeModule {}
