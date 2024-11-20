import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import MessageProvider from "./context/message/MessageProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MessageProvider>
      <App />
    </MessageProvider>
  </React.StrictMode>
);
