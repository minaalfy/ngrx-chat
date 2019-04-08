import { Action } from "@ngrx/store";
import { Message } from "@app/core/models/message.interface";

export enum EChatActions {
  ReveiveMsg = "[Chat] Receive Message",
  SendMessage = "[Chat] Send Message",
  SaveCurrentMsg = "[Chat] Save current message",
  BlinkTab = "[Chat] Toggle Tab Blink"
}

export class ReveiveMsg implements Action {
  public readonly type = EChatActions.ReveiveMsg;
  constructor(public payload: Message) {}
}


export class SaveCurrentMsg implements Action {
  public readonly type = EChatActions.SaveCurrentMsg;
  constructor(public payload: string) {}
}

export class SendMessage implements Action {
  public readonly type = EChatActions.SendMessage;
  constructor(public payload: Message) {}
}

export class BlinkTab implements Action {
  public readonly type = EChatActions.BlinkTab;
  constructor(public payload: boolean) {}
}

export type ChatActions = ReveiveMsg | SendMessage | SaveCurrentMsg | BlinkTab;
