import Box from "@mui/material/Box";
import "./App.css";
import ChatMessages from "./components/ChatMessages";
import SearchBar from "./components/SearchBar";
import TitleBar from "./components/TitleBar";

//TODO -> set Loading animations
//TODO -> Set ChatBox to auto scroll to the bottom

const App = () => {
  return (
    <Box maxHeight="100vh" maxWidth="100vw">
      <TitleBar />
      <ChatMessages />
      <SearchBar />
    </Box>
  );
};

export default App;
