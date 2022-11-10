import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoboAdvisorComponent } from './robo-advisor/robo-advisor.component';



@NgModule({
  declarations: [
    RoboAdvisorComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [RoboAdvisorComponent]
})
export class RoboAdvisorModule { }
