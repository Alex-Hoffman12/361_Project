import { Dispatch, createContext } from "react";
import { PromptAction } from "./MessageReducer";
import { messageState } from "../../Message";

interface MessageContext {
  messageState: messageState;
  dispatch: Dispatch<PromptAction>;
}

const messageContext = createContext<MessageContext>({
  messageState: {
    messages: [
      {
        message: "Hello, what error would you like more information about?",
        type: "apiMessage",
      },
    ],
    history: [],
    // id: 1,
  },
  dispatch: () => {},
});

export default messageContext;
