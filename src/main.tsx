import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Context, getDefaultContextData } from "./Context";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Context.Provider value={getDefaultContextData()}>
      <App />
    </Context.Provider>
  </React.StrictMode>
);
