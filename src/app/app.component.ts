import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { TranslateService } from "@ngx-translate/core";
import { merge } from "rxjs";
import { filter, map, mergeMap } from "rxjs/operators";
import { SocketioService } from '@app/core/services/socketio/socketio.service';

import { environment } from "@env/environment";
import { Logger, I18nService } from "@app/core";
import { Store } from "@ngrx/store";
import { IAppState } from "./core/store/state/app.state";
import { ReveiveMsg } from "./core/store/actions/chat.actions";
import { Message } from "./core/models/message.interface";
import { SetUserID } from "./core/store/actions/settings.actions";

const log = new Logger("App");

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private translateService: TranslateService,
    private i18nService: I18nService,
    private socket: SocketioService,
    private store: Store<IAppState>
  ) {}

  ngOnInit() {
    // Setup logger
    if (environment.production) {
      Logger.enableProductionMode();
    }
    this.socket.chatReceived$.subscribe((c: Message)=>{
      this.store.dispatch(new ReveiveMsg(c));
    });

    this.socket.userCreated$.then((id: number)=>{
      this.store.dispatch(new SetUserID(id));
    });

    log.debug("init");

    // Setup translations
    this.i18nService.init(environment.defaultLanguage, environment.supportedLanguages);

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
