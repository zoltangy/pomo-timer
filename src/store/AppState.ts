export interface Settings {
  work: number;
  shortBreak: number;
  longBreak: number;
  rounds: number;
}

export interface AppState extends Settings {
  timeLeft: number;
}

export function createAppState(settings: Settings): AppState {
  return {
    work: settings.work,
    shortBreak: settings.shortBreak,
    longBreak: settings.longBreak,
    rounds: settings.rounds,
    timeLeft:
      (settings.work * settings.rounds + settings.shortBreak * (settings.rounds - 1) + settings.longBreak) *
      60,
  };
}
