import { EChatActions, ChatActions } from "@app/core/store/actions/chat.actions";
import { IChatState, initialChatState } from "@app/core/store/state/chat.state";

export function chatReducers (state = initialChatState, action: ChatActions): IChatState {
  switch (action.type) {
    case EChatActions.ReveiveMsg: {
      return {
        ...state,
        messages: [...state.messages, action.payload]
      };
    }
    case EChatActions.SendMessage: {
      return {
        ...state,
        currentMessage: ""
      };
    }
    case EChatActions.SaveCurrentMsg: {
      return {
        ...state,
        currentMessage: action.payload
      };
    }

    case EChatActions.BlinkTab: {
      return {
        ...state,
        blinkChat: action.payload
      };
    }

    default:
      return state;
  }
};
