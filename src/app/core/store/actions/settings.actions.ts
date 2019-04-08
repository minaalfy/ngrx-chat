import { Action } from "@ngrx/store";

export enum ESettingsActions {
  ChangeName = "[Settings] Change user name",
  SetUserID = "[Settings] Set User ID",
  ChangeTheme = "[Settings] Change theme",
  ChangeClock = "[Settings] Change clock display",
  ChangeSendOnEnter = "[Settings] Toggle sending message on ctrl + enter",
  ChangeLanguage = "[Settings] Change language",
  Reset = "[Settings] Reset Settings"
}

export class ChangeName implements Action {
  public readonly type = ESettingsActions.ChangeName;
  constructor(public payload: string) {}
}
export class SetUserID implements Action {
  public readonly type = ESettingsActions.SetUserID;
  constructor(public payload: number) {}
}

export class ChangeTheme implements Action {
  public readonly type = ESettingsActions.ChangeTheme;
  constructor(public payload: string) {}
}
export class ChangeClock implements Action {
  public readonly type = ESettingsActions.ChangeClock;
  constructor(public payload: boolean) {}
}
export class ChangeSendOnEnter implements Action {
  public readonly type = ESettingsActions.ChangeSendOnEnter;
  constructor(public payload: boolean) {}
}
export class ChangeLanguage implements Action {
  public readonly type = ESettingsActions.ChangeLanguage;
  constructor(public payload: string) {}
}
export class Reset implements Action {
  public readonly type = ESettingsActions.Reset;
}

export type SettingsActions = ChangeName | SetUserID | ChangeTheme | ChangeClock | ChangeSendOnEnter | ChangeLanguage | Reset;
