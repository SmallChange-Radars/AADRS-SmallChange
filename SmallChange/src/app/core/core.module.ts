import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavBarComponent } from './nav-bar/nav-bar/nav-bar.component';
import { AppRoutingModule } from '../app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, NavBarComponent],
  imports: [CommonModule, AppRoutingModule, NgbModule],
  exports: [HeaderComponent, FooterComponent, NavBarComponent],
})
export class CoreModule {}
