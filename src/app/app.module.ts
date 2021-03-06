import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

import { environment } from '@env/environment';
import { CoreModule } from '@app/core';
import { ChatModule } from './chat/chat.module';
import { SettingsModule } from './settings/settings.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MatBadgeModule } from '@angular/material';

@NgModule({
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
    TranslateModule.forRoot(),
    BrowserAnimationsModule,
    MaterialModule,
    MatBadgeModule,
    CoreModule,
    ChatModule,
    SettingsModule,
    AppRoutingModule
  ],
  declarations: [AppComponent],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
