import { AppState, createAppState } from "./AppState";
import { ActionTypes, SAVE_SETTINGS, RESET, RESET_DEFAULTS, TIME_DECREASE } from "./Actions";

export const initState: AppState = createAppState({ work: 25, shortBreak: 5, longBreak: 20, rounds: 4 });

export default function rootReducer(state = initState, action: ActionTypes): AppState {
  switch (action.type) {
    case SAVE_SETTINGS:
      localStorage.setItem("work", action.payload.work.toString());
      localStorage.setItem("shortBreak", action.payload.shortBreak.toString());
      localStorage.setItem("longBreak", action.payload.longBreak.toString());
      localStorage.setItem("rounds", action.payload.rounds.toString());
      return createAppState({
        work: action.payload.work,
        shortBreak: action.payload.shortBreak,
        longBreak: action.payload.longBreak,
        rounds: action.payload.rounds,
      });

    case RESET:
      return {
        ...state,
        timeLeft: createAppState({
          work: state.work,
          shortBreak: state.shortBreak,
          longBreak: state.longBreak,
          rounds: state.rounds,
        }).timeLeft,
      };

    case RESET_DEFAULTS:
      localStorage.clear();
      return initState;

    case TIME_DECREASE:
      return {
        ...state,
        timeLeft: state.timeLeft - 1,
      };

    default:
      return state;
  }
}
