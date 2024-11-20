import { messageState } from "../../Message";
import { Message } from "../../Message";

interface MessageAdd {
  type: "ADD";
  message: Message;
}

interface MessageEdit {
  type: "EDIT";
  message: Message;
  index: number;
}

export type PromptAction = MessageAdd | MessageEdit;

const MessageReducer = (
  state: messageState,
  action: PromptAction
): messageState => {
  switch (action.type) {
    case "ADD":
      // console.log(state);
      return { ...state, messages: [...state.messages, action.message] };
    default:
      return state;
    case "EDIT":
      // console.log(state);
      return {
        ...state,
        messages: state.messages.map((message, index) => {
          if (index === action.index) {
            return action.message;
          } else {
            return message;
          }
        }),
      };
  }
};

export default MessageReducer;
