import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { TranslateService } from "@ngx-translate/core";
import { merge, Observable } from "rxjs";
import { filter, map, mergeMap } from "rxjs/operators";
import { SocketioService } from '@app/core/services/socketio/socketio.service';

import { environment } from "@env/environment";
import { Logger } from "@app/core";
import { Store, select } from "@ngrx/store";
import { IAppState } from "./core/store/state/app.state";
import { ReveiveMsg } from "./core/store/actions/chat.actions";
import { Message } from "./core/models/message.interface";
import { SetUserID } from "./core/store/actions/settings.actions";
import { IChatState } from "./core/store/state/chat.state";
import { selectChat } from "./core/store/selectors/chat.selector";

import enUS from '../translations/en-US.json';
import arEG from '../translations/ar-EG.json';

const log = new Logger("App");

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  chat$: Observable<IChatState>;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private translateService: TranslateService,
    private socket: SocketioService,
    private store: Store<IAppState>
  ) {
    translateService.setTranslation('en-US', enUS);
    translateService.setTranslation('ar-EG', arEG);
  }

  async ngOnInit() {
    // Setup logger
    if (environment.production) {
      Logger.enableProductionMode();
    }
    this.chat$ = this.store.pipe(select(selectChat));
    this.socket.chatReceived$.subscribe((m: Message)=>{
      this.store.dispatch(new ReveiveMsg(m));
    });
    const id = <number>await this.socket.userCreated$;
    this.store.dispatch(new SetUserID(id));
    
    const onNavigationEnd = this.router.events.pipe(filter(event => event instanceof NavigationEnd));

    // Change page title on navigation or language change, based on route data
    merge(this.translateService.onLangChange, onNavigationEnd)
      .pipe(
        map(() => {
          let route = this.activatedRoute;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter(route => route.outlet === "primary"),
        mergeMap(route => route.data)
      )
      .subscribe(event => {
        const title = event["title"];
        if (title) {
          this.titleService.setTitle(this.translateService.instant(title));
        }
      });
  }
}
