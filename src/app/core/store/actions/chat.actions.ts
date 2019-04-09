import { Action } from "@ngrx/store";
import { Message } from "@app/core/models/message.interface";
/**
* build enum for chat actions
*/
export enum EChatActions {
  ReveiveMsg = "[Chat] Receive Message",
  SendMessage = "[Chat] Send Message",
  SaveCurrentMsg = "[Chat] Save current message",
  BlinkTab = "[Chat] Toggle Tab Blink",
  UnreadCount = "[Chat] Unread Messages Counted"
}
/**
* build action ReveiveMsg
*/
export class ReveiveMsg implements Action {
  public readonly type = EChatActions.ReveiveMsg;
  constructor(public payload: Message) {}
}
/**
* build action SaveCurrentMsg
*/
export class SaveCurrentMsg implements Action {
  public readonly type = EChatActions.SaveCurrentMsg;
  constructor(public payload: string) {}
}
/**
* build action SendMessage
*/
export class SendMessage implements Action {
  public readonly type = EChatActions.SendMessage;
  constructor(public payload: Message) {}
}
/**
* build action BlinkTab
*/
export class BlinkTab implements Action {
  public readonly type = EChatActions.BlinkTab;
  constructor(public payload: boolean) {}
}
/**
* build action UnreadCount
*/
export class UnreadCount implements Action {
  public readonly type = EChatActions.UnreadCount;
  constructor(public payload: number) {}
}
/**
* export ChatActions
*/
export type ChatActions = ReveiveMsg | SendMessage | SaveCurrentMsg | BlinkTab | UnreadCount;
