import { NgModule, Optional, SkipSelf } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { RouteReuseStrategy, RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { RouteReusableStrategy } from "./route-reusable-strategy";
import { LocalStorageService } from "./services/local-storage/local-storage.service";
import { environment } from "@env/environment";

import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { EffectsModule } from "@ngrx/effects";
import { StoreRouterConnectingModule } from "@ngrx/router-store";
import {
  appReducers,
  metaReducers
} from "@app/core/store/reducers/app.reducers";
import { SettingsEffects } from "@app/core/store/effects/settings.effects";
import { ChatEffects } from "@app/core/store/effects/chat.effects";
import { SocketIoModule } from "ngx-socket-io";

export function extract(s: string) {
  return s;
}

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule,
    StoreModule.forRoot(appReducers, { metaReducers }),
    EffectsModule.forRoot([SettingsEffects, ChatEffects]),
    StoreRouterConnectingModule.forRoot({ stateKey: "router" }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    SocketIoModule,
    RouterModule
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: RouteReusableStrategy
    },
    LocalStorageService
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    // Import guard
    if (parentModule) {
      throw new Error(
        `${parentModule} has already been loaded. Import Core module in the AppModule only.`
      );
    }
  }
}
