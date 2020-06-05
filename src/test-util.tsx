import React from "react";
import { render, RenderOptions } from "@testing-library/react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import { myTheme } from "./Theme";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer, { initState } from "./store/Reducers";
import { AppState } from "./store/AppState";

const renderWithProviders = (
  ui: React.ReactElement,
  initialStoreState: AppState = initState,
  options?: Omit<RenderOptions, "queries">
) => {
  const AllTheProviders: React.FC = ({ children }) => {
    return (
      <ThemeProvider theme={myTheme}>
        <CssBaseline />
        <Provider store={createStore(rootReducer, initialStoreState)}>{children}</Provider>
      </ThemeProvider>
    );
  };

  return render(ui, { wrapper: AllTheProviders, ...options });
};

export { renderWithProviders };
