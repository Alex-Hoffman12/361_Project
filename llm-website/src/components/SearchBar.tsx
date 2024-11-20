import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import useEventSource from "../hooks/useEventSource";

//TODO -> set loading animations for when it is loading

const SearchBar = () => {
  const [query, setQuery] = useState<string>("");
  const [sumbit, setSumbit] = useState(false);
  const [lastKey, setLastKey] = useState("");
  const { loading, setLoading } = useEventSource(query, sumbit);

  useEffect(() => {
    if (sumbit) {
      setQuery("");
    }
  }, [sumbit]);

  useEffect(() => {
    if (loading === false) {
      setSumbit(false);
    }
  }, [loading]);

  const handleEnter = (e: any) => {
    if (e.key) {
      if (e.key !== "Enter") {
        setLastKey(e.key);
        return;
      }
      if (lastKey === "Shift") {
        return "\n";
      }
      e.preventDefault();
      if (!query) {
        return;
      }
      setLastKey(e.key);
      setSumbit(true);
      setLoading(true);
    } else {
      e.preventDefault();
      if (!query) {
        return;
      }
      setSumbit(true);
      setLoading(true);
    }
  };

  //TODO -> Center SearchBar

  return (
    <Box paddingTop={5} width="75%" margin="auto" className="search">
      <form onSubmit={handleEnter}>
        <TextField
          fullWidth={true}
          type="text"
          id="userInput"
          multiline={true}
          variant="standard"
          placeholder="Enter what you would like to ask GPT"
          disabled={loading}
          className="input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleEnter}
          InputProps={{
            endAdornment: (
              <Button type="submit" disabled={loading}>
                <svg
                  className="submit-button"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                </svg>
              </Button>
            ),
          }}
        ></TextField>
      </form>
    </Box>
  );
};

export default SearchBar;
