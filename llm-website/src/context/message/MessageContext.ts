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
        message: "Hi, what would you like to learn about this document?",
        type: "apiMessage",
      },
    ],
    history: [],
    // id: 1,
  },
  dispatch: () => {},
});

export default messageContext;
