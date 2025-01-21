import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import { Provider } from "react-redux";
import { appStore } from "./Stores/appStore";

if (process.env.NODE_ENV === "production") {
  disableReactDevTools();
}
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
function getEntryPoint() {
  if (process.env.NODE_ENV === "production") {
    return (
      <Provider store={appStore}>
        <App />
      </Provider>
    );
  } else {
    return (
      <React.StrictMode>
        <Provider store={appStore}>
          <App />
        </Provider>
      </React.StrictMode>
    );
  }
}
root.render(getEntryPoint());

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
