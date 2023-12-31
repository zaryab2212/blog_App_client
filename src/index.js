import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import { UserContextProvider } from "./context/userContext";
import { UserProvider } from "./context/userContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <UserContextProvider> */}
    <UserProvider>
      {" "}
      <App />{" "}
    </UserProvider>

    {/* </UserContextProvider> */}
  </React.StrictMode>
);
