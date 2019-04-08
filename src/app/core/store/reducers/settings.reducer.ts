import { ESettingsActions, SettingsActions } from "@app/core/store/actions/settings.actions";
import { ISettingsState, initialSettingsState } from "@app/core/store/state/settings.state";
import { environment } from "@env/environment";

export function settingsReducers (state = initialSettingsState, action: SettingsActions): ISettingsState {
  switch (action.type) {
    case ESettingsActions.ChangeName: {
      return {
        ...state,
        user: {
          userid: state.user.userid,
          username: action.payload
        }
      };
    }
    case ESettingsActions.SetUserID: {
      let username = state.user.username;
      if(username === environment.defaultUserName) {
        username = environment.defaultUserName + ("000" + action.payload).slice(-4);
      }
      return {
        ...state,
        user: {
          userid: action.payload,
          username: username
        }
      };
    }
    case ESettingsActions.ChangeTheme: {
      return {
        ...state,
        theme: action.payload
      };
    }
    case ESettingsActions.ChangeClock: {
      return {
        ...state,
        clock: action.payload
      };
    }
    case ESettingsActions.ChangeSendOnEnter: {
      return {
        ...state,
        sendonenter: action.payload
      };
    }
    case ESettingsActions.ChangeLanguage: {
      return {
        ...state,
        language: action.payload
      };
    }
    case ESettingsActions.Reset: {
      return {
        ...initialSettingsState,
        user: {
          userid: state.user.userid,
          username: environment.defaultUserName + ("000" + state.user.userid).slice(-4)
        }
      }
    }
  
    default:
      return state;
  }
};
