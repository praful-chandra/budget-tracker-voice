import React from "react";
import ReactDOM from "react-dom";
import { SpeechProvider } from "@speechly/react-client";
import App from "./App";
import "./index.css";

import { Provider } from "./context/context";

ReactDOM.render(
  <SpeechProvider appId="00f37a1b-e130-430d-b7ce-07ff970f76f9" language="en-US">
    <Provider>
      <App />
    </Provider>
  </SpeechProvider>,
  document.getElementById("root")
);
