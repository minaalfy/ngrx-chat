import { createSelector } from "@ngrx/store";

import { IAppState } from "@app/core/store/state/app.state";
import { IChatState } from "@app/core/store/state/chat.state";

const chatState = (state: IAppState) => state.chat;

export const selectChat = createSelector(
  chatState,
  (state: IChatState) => state
);
