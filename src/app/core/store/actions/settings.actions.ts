import { Action } from "@ngrx/store";
/**
* build enum for settings actions
*/
export enum ESettingsActions {
  ChangeName = "[Settings] Change user name",
  SetUserID = "[Settings] Set User ID",
  ChangeTheme = "[Settings] Change theme",
  ChangeClock = "[Settings] Change clock display",
  ChangeSendOnEnter = "[Settings] Toggle sending message on ctrl + enter",
  ChangeLanguage = "[Settings] Change language",
  Reset = "[Settings] Reset Settings"
}
/**
* build action ChangeName
*/
export class ChangeName implements Action {
  public readonly type = ESettingsActions.ChangeName;
  constructor(public payload: string) {}
}
/**
* build action SetUserID
*/
export class SetUserID implements Action {
  public readonly type = ESettingsActions.SetUserID;
  constructor(public payload: number) {}
}
/**
* build action ChangeTheme
*/
export class ChangeTheme implements Action {
  public readonly type = ESettingsActions.ChangeTheme;
  constructor(public payload: string) {}
}
/**
* build action ChangeClock
*/
export class ChangeClock implements Action {
  public readonly type = ESettingsActions.ChangeClock;
  constructor(public payload: boolean) {}
}
/**
* build action ChangeSendOnEnter
*/
export class ChangeSendOnEnter implements Action {
  public readonly type = ESettingsActions.ChangeSendOnEnter;
  constructor(public payload: boolean) {}
}
/**
* build action ChangeLanguage
*/
export class ChangeLanguage implements Action {
  public readonly type = ESettingsActions.ChangeLanguage;
  constructor(public payload: string) {}
}
/**
* build action Reset
*/
export class Reset implements Action {
  public readonly type = ESettingsActions.Reset;
}
/**
* export SettingsActions
*/
export type SettingsActions = ChangeName | SetUserID | ChangeTheme | ChangeClock | ChangeSendOnEnter | ChangeLanguage | Reset;
