import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';

import { IAppState } from "@app/core/store/state/app.state";

import { chatReducers } from '@app/core/store/reducers/chat.reducer';
import { settingsReducers } from '@app/core/store/reducers/settings.reducer';
import { initStateFromLocalStorage } from './local-storage.reducer';

export const metaReducers: MetaReducer<IAppState>[] = [
  initStateFromLocalStorage
];

export const appReducers: ActionReducerMap<IAppState, any> = {
  router: routerReducer,
  settings: settingsReducers,
  chat: chatReducers
};