import { createStore } from "redux";
import { AppState, createAppState } from "./AppState";
import rootReducer from "./Reducers";
import localStorageAvailable from "./LocalStorage";

let preloadedState: AppState | undefined = undefined;

if (localStorageAvailable()) {
  if (localStorage.getItem("work")) {
    const work = Number(localStorage.getItem("work"));
    const shortBreak = Number(localStorage.getItem("shortBreak"));
    const longBreak = Number(localStorage.getItem("longBreak"));
    const rounds = Number(localStorage.getItem("rounds"));
    preloadedState = createAppState({ work, shortBreak, longBreak, rounds });
  }
}

const store = createStore(rootReducer, preloadedState);

export default store;
