import rootReducer from "./Reducers";
import * as Actions from "./Actions";

describe("Reducer tests", () => {
  it("should use correct initial state and decrease timeLeft", () => {
    expect(rootReducer(undefined, Actions.timeDecrease())).toEqual({
      work: 25,
      shortBreak: 5,
      longBreak: 20,
      rounds: 4,
      timeLeft: 8099,
    });
  });

  it("should reset timeLeft correctly", () => {
    expect(
      rootReducer(
        {
          work: 10,
          shortBreak: 5,
          longBreak: 10,
          rounds: 2,
          timeLeft: 10,
        },
        Actions.reset()
      )
    ).toEqual({
      work: 10,
      shortBreak: 5,
      longBreak: 10,
      rounds: 2,
      timeLeft: 2100,
    });
  });

  it("should reset to defaults correctly", () => {
    expect(
      rootReducer(
        {
          work: 10,
          shortBreak: 5,
          longBreak: 10,
          rounds: 2,
          timeLeft: 10,
        },
        Actions.resetDefaults()
      )
    ).toEqual({
      work: 25,
      shortBreak: 5,
      longBreak: 20,
      rounds: 4,
      timeLeft: 8100,
    });
  });

  it("should save settings", () => {
    expect(
      rootReducer(
        {
          work: 10,
          shortBreak: 5,
          longBreak: 10,
          rounds: 2,
          timeLeft: 10,
        },
        Actions.saveSettings({
          work: 20,
          shortBreak: 5,
          longBreak: 10,
          rounds: 1,
        })
      )
    ).toEqual({
      work: 20,
      shortBreak: 5,
      longBreak: 10,
      rounds: 1,
      timeLeft: 1800,
    });
    expect(Object.keys(localStorage.__STORE__).length).toBe(4);
    expect(localStorage.setItem).toHaveBeenCalledTimes(4);
    expect(localStorage.__STORE__["work"]).toBe("20");
    expect(localStorage.__STORE__["shortBreak"]).toBe("5");
    expect(localStorage.__STORE__["longBreak"]).toBe("10");
    expect(localStorage.__STORE__["rounds"]).toBe("1");
  });
});
