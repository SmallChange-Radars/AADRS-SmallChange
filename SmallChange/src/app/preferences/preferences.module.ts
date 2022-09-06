import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreferencesFormComponent } from './preferences-form/preferences-form.component';
import { PreferencesPageComponent } from './preferences-page/preferences-page.component';
import { CoreModule } from '../core/core.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PreferencesFormComponent, PreferencesPageComponent],
  imports: [CommonModule, CoreModule, FormsModule],
  exports: [PreferencesPageComponent],
})
export class PreferencesModule {}
