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
/**
* ChatEffects class used to attach side effects for store chat actions
*/
@Injectable()
export class ChatEffects {
  /**
  * inject  Actions, Store, LocalStorageService, SocketioService
  */
  constructor(
    private actions$: Actions<ChatActions>,
    private store: Store<IAppState>,
    private localStorageService: LocalStorageService,
    private socket: SocketioService
  ) {}
  /**
  * attach setitem to localstorage with each action in EChatActions
  */
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
  /**
  * attach SendMessage to server event with each store dispatch SendMessage
  */
  @Effect({ dispatch: false })
  addMessage$ = this.actions$.pipe(
    ofType(EChatActions.SendMessage),
    map((action: SendMessage) => action.payload),
    tap(msg => this.socket.chatSend(msg))
  );

  /**
  * dispatch new BlinkTab(true) and new UnreadCount(state.chat.unread + 1) when ReveiveMsg while the user in another page 
  */
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
