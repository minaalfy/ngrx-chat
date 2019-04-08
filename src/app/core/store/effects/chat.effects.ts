import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import {
  ChatActions,
  SendMessage,
  EChatActions
} from "@app/core/store/actions/chat.actions";

import { SocketioService } from "@app/core/services/socketio/socketio.service";
import { IAppState } from "../state/app.state";
import { Store } from "@ngrx/store";
import { map, tap } from "rxjs/operators";

@Injectable()
export class ChatEffects {
  constructor(
    private actions$: Actions<ChatActions>,
    private store: Store<IAppState>,
    private socket: SocketioService
  ) {}

  @Effect({ dispatch: false })
  addMessage$ = this.actions$.pipe(
    ofType(EChatActions.SendMessage),
    map((action: SendMessage) => action.payload),
    tap(msg => this.socket.chatSend(msg))
  );
}
