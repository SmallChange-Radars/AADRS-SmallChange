import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioPageComponent } from './portfolio-page/portfolio-page.component';
import { PortfolioTableComponent } from './portfolio-table/portfolio-table.component';



@NgModule({
  declarations: [
    PortfolioPageComponent,
    PortfolioTableComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PortfolioPageComponent
  ]
})
export class PortfolioModule { }
