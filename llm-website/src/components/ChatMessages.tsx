import { Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useContext } from "react";
import BotImage from "../assets/bot-image.png";
import UserImage from "../assets/usericon.png";
import messageContext from "../context/message/MessageContext";
import "./ChatMessage.css";

//TODO -> Set ChatBox to auto scroll to the bottom

const ChatMessages = () => {
  const { messageState } = useContext(messageContext);

  return (
    <Box className="chatBox">
      <Box className="boxWrapLeft">
        {messageState.messages
          ? messageState.messages.map((message, index) => (
              <Stack
                id={index.toString()}
                direction="row"
                spacing={1}
                className={
                  message.type === "apiMessage"
                    ? "aiMessageBox"
                    : "userMessageBox"
                }
                key={"stack" + index}
              >
                {message.type === "userMessage" ? (
                  <img
                    key={"user" + index}
                    src={UserImage}
                    alt="user"
                    width="50"
                    height="50"
                    className="image"
                  />
                ) : (
                  <img
                    key={"ai" + index}
                    src={BotImage}
                    alt="user"
                    width="50"
                    height="50"
                    className="image"
                  ></img>
                )}
                <Typography
                  fontSize={18}
                  padding="5px"
                  key={"text" + index}
                  style={{ whiteSpace: "pre-line" }}
                >
                  {message.message}
                </Typography>
              </Stack>
            ))
          : null}
      </Box>
    </Box>
  );
};

export default ChatMessages;
