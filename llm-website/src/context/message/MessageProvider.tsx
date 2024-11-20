import { ReactNode, useReducer } from "react";
import MessageReducer from "./MessageReducer";
import MessageContext from "./MessageContext";

interface Props {
  children: ReactNode;
}

const MessageProvider = ({ children }: Props) => {
  const [messages, dispatch] = useReducer(MessageReducer, {
    messages: [
      {
        message: "Hello, what error would you like more information about?",
        type: "apiMessage",
      },
    ],
    history: [],
  });

  return <MessageContext.Provider value={{ messageState: messages, dispatch }}>{children}</MessageContext.Provider>;
};

export default MessageProvider;
