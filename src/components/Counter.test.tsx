import React from "react";
import { fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../test-util";
import Counter, { getActivity } from "./Counter";

describe("Counter tests", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(window.HTMLMediaElement.prototype, "play").mockReset();
  });

  it("tests that getActivity returns the correct activity", () => {
    expect(getActivity(25, 5, 20, 3, 4200)).toEqual({
      name: "WORK",
      remaining: 1200,
      duration: 1500,
    });
    expect(getActivity(25, 5, 20, 3, 2820)).toEqual({ name: "BREAK", remaining: 120, duration: 300 });
    expect(getActivity(25, 5, 20, 4, 8100)).toEqual({
      name: "WORK",
      remaining: 1500,
      duration: 1500,
    });
    expect(getActivity(25, 5, 20, 3, 1200)).toEqual({ name: "WORK", remaining: 0, duration: 1500 });
    expect(getActivity(25, 5, 20, 3, 1199)).toEqual({
      name: "LONG BREAK",
      remaining: 1199,
      duration: 1200,
    });
  });

  it("displays correct values as time passes by", () => {
    const play = jest.spyOn(window.HTMLMediaElement.prototype, "play");
    expect(play).not.toHaveBeenCalled();
    const { getByText, getByRole } = renderWithProviders(<Counter />);
    getByText("WORK");
    getByText("25:00");
    getByRole("button", { name: "Reset" });
    expect(play).not.toHaveBeenCalled();
    fireEvent.click(getByRole("button", { name: "start" }));
    expect(play).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(1000);
    getByText("WORK");
    getByText("24:59");
    expect(play).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(1500000);
    getByText("BREAK");
    getByText("04:59");
    expect(play).toHaveBeenCalledTimes(2);
    jest.advanceTimersByTime(300000);
    getByText("WORK");
    getByText("24:59");
    expect(play).toHaveBeenCalledTimes(3);
  });

  it("starts/pauses the counter when the button is pressed", () => {
    const play = jest.spyOn(window.HTMLMediaElement.prototype, "play");
    const { getByText, getByRole } = renderWithProviders(<Counter />);
    getByText("WORK");
    getByText("25:00");
    fireEvent.click(getByRole("button", { name: "start" }));
    expect(play).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(5000);
    getByText("WORK");
    getByText("24:55");
    expect(play).toHaveBeenCalledTimes(1);
    fireEvent.click(getByRole("button", { name: "pause" }));
    jest.advanceTimersByTime(5000);
    getByText("WORK");
    getByText("24:55");
    expect(play).toHaveBeenCalledTimes(1);
    fireEvent.click(getByRole("button", { name: "start" }));
    expect(play).toHaveBeenCalledTimes(2);
    jest.advanceTimersByTime(5000);
    getByText("WORK");
    getByText("24:50");
    expect(play).toHaveBeenCalledTimes(2);
  });

  it("resets the counter correctly when reset is clicked", () => {
    const { getByText, getByRole } = renderWithProviders(<Counter />);
    getByText("WORK");
    getByText("25:00");
    fireEvent.click(getByRole("button", { name: "start" }));
    jest.advanceTimersByTime(1501000);
    getByText("BREAK");
    getByText("04:59");
    getByRole("button", { name: "pause" });
    fireEvent.click(getByRole("button", { name: "Reset" }));
    getByText("WORK");
    getByText("25:00");
    getByRole("button", { name: "start" });
  });

  it("stops at the end correctly", () => {
    const play = jest.spyOn(window.HTMLMediaElement.prototype, "play");
    const { getByText, getByRole } = renderWithProviders(<Counter />, {
      work: 1,
      shortBreak: 1,
      longBreak: 1,
      rounds: 2,
      timeLeft: 240,
    });
    getByText("WORK");
    getByText("01:00");
    fireEvent.click(getByRole("button", { name: "start" }));
    jest.advanceTimersByTime(245000);
    getByText("LONG BREAK");
    getByText("00:00");
    getByRole("button", { name: "start" });
    expect(play).toHaveBeenCalledTimes(5);
  });
});
