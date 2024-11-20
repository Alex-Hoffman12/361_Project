import { fetchEventSource } from "@microsoft/fetch-event-source";
import { PromptAction } from "../context/message/MessageReducer";

//TODO -> find out why onopen is sending an error

const FetchData = async (
  prompt: string,
  dispatch: React.Dispatch<PromptAction>,
  currentIndex: number
) => {
  const controller = new AbortController();
  const serverBaseURL = "http://localhost:8005/prompt/";
  var intString = "";

  try {
    await fetchEventSource(`${serverBaseURL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "text/event-stream",
      },
      body: JSON.stringify({
        prompt: prompt,
      }),
      signal: controller.signal,
      onopen(response) {
        if (response.status !== 200) {
          throw new Error(`error status: ${response.status}`);
        }
        console.log(response);
        dispatch({
          type: "ADD",
          message: {
            message: "",
            type: "apiMessage",
          },
        });
      },
      onmessage(event) {
        if (event.data === "") {
          if (intString[intString.length - 1] === " ") {
            intString = intString + "\n";
          } else {
            intString = intString + " ";
          }
        } else {
          intString = intString + event.data;
        }

        dispatch({
          type: "EDIT",
          message: {
            message: intString,
            type: "apiMessage",
          },
          index: currentIndex,
        });
      },
      onerror(err) {
        throw new Error(`Error: ${err}`);
      },
    });
  } catch (e) {
    intString = e.message;
  }

  dispatch({
    type: "EDIT",
    message: {
      message: intString,
      type: "apiMessage",
    },
    index: currentIndex,
  });

  return () => controller.abort();
};

export default FetchData;
