import { useContext, useEffect, useState } from "react";
import messageContext from "../context/message/MessageContext";
import FetchData from "../services/FetchData";

const useEventSource = (prompt: string, sumbitted: boolean) => {
  // Turn this to true if you don't have an AI Key and it will just alternate between User and AI
  const dev = false;

  const [state, setState] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { messageState, dispatch } = useContext(messageContext);

  useEffect(() => {
    if (prompt && sumbitted) {
      setLoading(true);
      setError(false);

      try {
        prompt = prompt.trim();

        // Easy and Small Debug Test Prompt
        // prompt = "Write me a haiku";

        if (!dev) {
          dispatch({
            type: "ADD",
            message: {
              message: prompt,
              type: "userMessage",
            },
          });
          FetchData(prompt, dispatch, messageState.messages.length + 1).then(
            () => setLoading(false)
          );
        } else {
          if (messageState.messages.length % 2) {
            dispatch({
              type: "ADD",
              message: {
                message: prompt,
                type: "userMessage",
              },
            });
          } else {
            dispatch({
              type: "ADD",
              message: {
                message: prompt,
                type: "apiMessage",
              },
            });
          }
        }
      } catch (e) {
        setError(true);
        dispatch({
          type: "ADD",
          message: {
            message: e.toString(),
            type: "apiMessage",
          },
        });
      }
    }
  }, [sumbitted]);

  return { state, loading, setLoading, error };
};

export default useEventSource;
