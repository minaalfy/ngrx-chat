import { RouterReducerState } from "@ngrx/router-store";

import { IChatState, initialChatState } from "@app/core/store/state/chat.state";
import { initialSettingsState, ISettingsState } from "@app/core/store/state/settings.state";

export interface IAppState {
  router?: RouterReducerState;
  chat: IChatState;
  settings: ISettingsState;
}

export const initialAppState: IAppState = {
  chat: initialChatState,
  settings: initialSettingsState
};

export function getInitialState(): IAppState {
  return initialAppState;
}
