import React from "react";
import { renderWithProviders } from "../test-util";
import ProgressBar from "./ProgressBar";

describe("ProgressBar tests", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it("should render initial state correctly", () => {
    const { getAllByText, getByRole, getByText } = renderWithProviders(<ProgressBar />);
    expect(getAllByText("work")).toHaveLength(4);
    expect(getAllByText("short break")).toHaveLength(3);
    expect(getAllByText("long break")).toHaveLength(1);
    expect(getByRole("slider", { name: "time progress" })).toHaveAttribute("aria-valuenow", "135");
    getByText("0");
  });

  it("should render according to the store values", () => {
    const { getAllByText, getByRole, getByText } = renderWithProviders(<ProgressBar />, {
      work: 10,
      shortBreak: 2,
      longBreak: 10,
      rounds: 2,
      timeLeft: 1800,
    });
    expect(getAllByText("work")).toHaveLength(2);
    expect(getAllByText("short break")).toHaveLength(1);
    expect(getAllByText("long break")).toHaveLength(1);
    expect(getByRole("slider", { name: "time progress" })).toHaveAttribute("aria-valuenow", "30");
    getByText("2");
  });
});
