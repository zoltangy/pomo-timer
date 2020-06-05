import React from "react";
import ReactDOM from "react-dom";
import "typeface-roboto";
import { Provider } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import ReactPWAInstallProvider from "react-pwa-install";
import { myTheme } from "./Theme";
import store from "./store/Store";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={myTheme}>
      <CssBaseline />
      <ReactPWAInstallProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </ReactPWAInstallProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.register();
