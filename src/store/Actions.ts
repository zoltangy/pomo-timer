import { Settings } from "./AppState";

export const SAVE_SETTINGS = "SAVE_SETTINGS";
export const RESET = "RESET";
export const RESET_DEFAULTS = "RESET_DEFAULTS";
export const TIME_DECREASE = "TIME_DECREASE";

interface SaveSettingsAction {
  type: typeof SAVE_SETTINGS;
  payload: Settings;
}

interface ResetAction {
  type: typeof RESET;
}

interface ResetDefaultsAction {
  type: typeof RESET_DEFAULTS;
}

interface TimeDecreaseAction {
  type: typeof TIME_DECREASE;
}

export type ActionTypes = SaveSettingsAction | ResetAction | ResetDefaultsAction | TimeDecreaseAction;

export function saveSettings(settings: Settings): ActionTypes {
  return { type: SAVE_SETTINGS, payload: settings };
}

export function reset(): ActionTypes {
  return { type: RESET };
}

export function resetDefaults(): ActionTypes {
  return { type: RESET_DEFAULTS };
}

export function timeDecrease(): ActionTypes {
  return { type: TIME_DECREASE };
}
