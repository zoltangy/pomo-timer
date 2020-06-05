import React from "react";
import { fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../test-util";
import Settings from "./Settings";

describe("Settings tests", () => {
  it("renders correctly", () => {
    const { getByText, getByRole, baseElement } = renderWithProviders(<Settings />);
    fireEvent.click(getByRole("button", { name: "settings" }));
    getByText("Work: 25:00");
    expect(getByRole("slider", { name: "work" })).toHaveAttribute("aria-valuenow", "25");
    getByText("Short break: 5:00");
    expect(getByRole("slider", { name: "short break" })).toHaveAttribute("aria-valuenow", "5");
    getByText("Long break: 20:00");
    expect(getByRole("slider", { name: "long break" })).toHaveAttribute("aria-valuenow", "20");
    getByText("Rounds: 4");
    expect(getByRole("slider", { name: "rounds" })).toHaveAttribute("aria-valuenow", "4");
    getByText("Save");
    getByText("Reset Defaults");
    expect(baseElement).toMatchSnapshot();
  });

  it("should update values as sliders moves", () => {
    const { getByText, getByRole } = renderWithProviders(<Settings />);
    fireEvent.click(getByRole("button", { name: "settings" }));
    getByText("Work: 25:00");
    getByText("Short break: 5:00");
    getByText("Long break: 20:00");
    getByText("Rounds: 4");
    fireEvent.keyDown(getByRole("slider", { name: "work" }), { key: "ArrowLeft", code: "ArrowLeft" });
    getByText("Work: 24:00");
    fireEvent.keyDown(getByRole("slider", { name: "short break" }), {
      key: "ArrowRight",
      code: "ArrowRight",
    });
    fireEvent.keyDown(getByRole("slider", { name: "short break" }), {
      key: "ArrowRight",
      code: "ArrowRight",
    });
    getByText("Short break: 7:00");
    fireEvent.keyDown(getByRole("slider", { name: "long break" }), {
      key: "ArrowRight",
      code: "ArrowRight",
    });
    getByText("Long break: 21:00");
    fireEvent.keyDown(getByRole("slider", { name: "rounds" }), {
      key: "ArrowLeft",
      code: "ArrowLeft",
    });
    getByText("Rounds: 3");
  });

  it("should save the new values", async () => {
    const { getByText, getByRole, findByRole } = renderWithProviders(<Settings />);
    fireEvent.click(getByRole("button", { name: "settings" }));
    getByText("Work: 25:00");
    getByText("Short break: 5:00");
    getByText("Long break: 20:00");
    getByText("Rounds: 4");
    fireEvent.keyDown(getByRole("slider", { name: "work" }), { key: "ArrowLeft", code: "ArrowLeft" });
    getByText("Work: 24:00");
    fireEvent.keyDown(getByRole("slider", { name: "short break" }), {
      key: "ArrowRight",
      code: "ArrowRight",
    });
    fireEvent.keyDown(getByRole("slider", { name: "short break" }), {
      key: "ArrowRight",
      code: "ArrowRight",
    });
    getByText("Short break: 7:00");
    fireEvent.keyDown(getByRole("slider", { name: "long break" }), {
      key: "ArrowRight",
      code: "ArrowRight",
    });
    getByText("Long break: 21:00");
    fireEvent.keyDown(getByRole("slider", { name: "rounds" }), {
      key: "ArrowLeft",
      code: "ArrowLeft",
    });
    getByText("Rounds: 3");
    fireEvent.click(getByRole("button", { name: "Save" }));
    fireEvent.click(await findByRole("button", { name: "settings" }));
    getByText("Work: 24:00");
    getByText("Short break: 7:00");
    getByText("Long break: 21:00");
    getByText("Rounds: 3");
  });

  it("should reset values to saved ones on reopen if changes were not saved", async () => {
    const { getByText, getByRole, findByRole } = renderWithProviders(<Settings />);
    fireEvent.click(getByRole("button", { name: "settings" }));
    getByText("Work: 25:00");
    getByText("Short break: 5:00");
    getByText("Long break: 20:00");
    getByText("Rounds: 4");
    fireEvent.keyDown(getByRole("slider", { name: "rounds" }), {
      key: "ArrowLeft",
      code: "ArrowLeft",
    });
    getByText("Rounds: 3");
    fireEvent.click(getByRole("button", { name: "Save" }));
    fireEvent.click(await findByRole("button", { name: "settings" }));
    getByText("Rounds: 3");
    fireEvent.keyDown(getByRole("slider", { name: "rounds" }), {
      key: "ArrowLeft",
      code: "ArrowLeft",
    });
    getByText("Rounds: 2");
    fireEvent.click(getByRole("button", { name: "close settings" }));
    fireEvent.click(await findByRole("button", { name: "settings" }));
    getByText("Rounds: 3");
  });

  it("should reset values to defaults when the button is clicked", async () => {
    const { getByText, getByRole, findByRole } = renderWithProviders(<Settings />);
    fireEvent.click(getByRole("button", { name: "settings" }));
    getByText("Work: 25:00");
    getByText("Short break: 5:00");
    getByText("Long break: 20:00");
    getByText("Rounds: 4");
    fireEvent.keyDown(getByRole("slider", { name: "rounds" }), {
      key: "ArrowLeft",
      code: "ArrowLeft",
    });
    fireEvent.keyDown(getByRole("slider", { name: "work" }), { key: "ArrowLeft", code: "ArrowLeft" });
    getByText("Rounds: 3");
    getByText("Work: 24:00");
    fireEvent.click(getByRole("button", { name: "Save" }));
    fireEvent.click(await findByRole("button", { name: "settings" }));
    getByText("Rounds: 3");
    getByText("Work: 24:00");
    fireEvent.click(getByRole("button", { name: "Reset Defaults" }));
    getByText("Work: 25:00");
    getByText("Short break: 5:00");
    getByText("Long break: 20:00");
    getByText("Rounds: 4");
    fireEvent.click(getByRole("button", { name: "close settings" }));
    fireEvent.click(await findByRole("button", { name: "settings" }));
    getByText("Work: 25:00");
    getByText("Short break: 5:00");
    getByText("Long break: 20:00");
    getByText("Rounds: 4");
  });
});
