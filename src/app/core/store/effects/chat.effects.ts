import { Injectable } from "@angular/core";
import { LocalStorageService } from "@app/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import {
  ChatActions,
  SendMessage,
  EChatActions,
  ReveiveMsg,
  BlinkTab,
  UnreadCount
} from "@app/core/store/actions/chat.actions";

import { SocketioService } from "@app/core/services/socketio/socketio.service";
import { IAppState } from "../state/app.state";
import { Store, select } from "@ngrx/store";
import { map, tap, first, withLatestFrom } from "rxjs/operators";
import { selectChat } from "../selectors/chat.selector";

@Injectable()
export class ChatEffects {
  constructor(
    private actions$: Actions<ChatActions>,
    private store: Store<IAppState>,
    private localStorageService: LocalStorageService,
    private socket: SocketioService
  ) {}

  @Effect({ dispatch: false })
  persistSettings = this.actions$.pipe(
    ofType(
      EChatActions.SaveCurrentMsg,
      EChatActions.BlinkTab,
      EChatActions.UnreadCount
    ),
    withLatestFrom(this.store.pipe(select(selectChat))),
    tap(([action, chat]) =>
      this.localStorageService.setItem('MESSAGES', chat)
    )
  );

  @Effect({ dispatch: false })
  addMessage$ = this.actions$.pipe(
    ofType(EChatActions.SendMessage),
    map((action: SendMessage) => action.payload),
    tap(msg => this.socket.chatSend(msg))
  );

  @Effect({ dispatch: false })
  receiveMessage$ = this.actions$.pipe(
    ofType(EChatActions.ReveiveMsg),
    map((action: ReveiveMsg) => action.payload),
    tap(() => {
      this.store.pipe(
        first()
      ).subscribe((state)=>{
        if(state.router.state.url !== '/chat'){
          this.store.dispatch(new BlinkTab(true));
          this.store.dispatch(new UnreadCount(state.chat.unread + 1));
        }
      })
    })
  );
}
