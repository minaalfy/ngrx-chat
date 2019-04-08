import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '@app/material.module';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    FormsModule,
    MaterialModule,
    SettingsRoutingModule
  ],
  declarations: [
    SettingsComponent
  ]
})
export class SettingsModule { }
