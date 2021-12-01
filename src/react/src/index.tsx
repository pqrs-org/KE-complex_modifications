import React from "react";
import ReactDOM from "react-dom";
import { CssBaseline } from "@mui/material";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  JsonModalContextProvider,
  LocationHashContextProvider,
  SearchQueryContextProvider,
  SnackbarContextProvider,
} from "./contexts";

ReactDOM.render(
  <React.StrictMode>
    <JsonModalContextProvider>
      <LocationHashContextProvider>
        <SearchQueryContextProvider>
          <SnackbarContextProvider>
            <CssBaseline />
            <App />
          </SnackbarContextProvider>
        </SearchQueryContextProvider>
      </LocationHashContextProvider>
    </JsonModalContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
