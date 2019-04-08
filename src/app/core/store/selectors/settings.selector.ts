import { createSelector } from "@ngrx/store";

import { IAppState } from "@app/core/store/state/app.state";
import { ISettingsState } from "@app/core/store/state/settings.state";

const settingsState = (state: IAppState) => state.settings;

export const selectSettings = createSelector(
  settingsState,
  (state: ISettingsState) => state
);
