import React from "react";
import { render, act, fireEvent } from "@testing-library/react";
import InfoLink from "./InfoLink";

describe("InfoLink tests", () => {
  it("shows component when online/offline", async () => {
    const { asFragment, queryByLabelText, getByLabelText, baseElement } = render(<InfoLink />);

    expect(queryByLabelText("Info link online")).toBeTruthy();
    expect(queryByLabelText("Info link offline")).toBeNull();
    expect(asFragment()).toMatchSnapshot();

    act(() => {
      window.dispatchEvent(new Event("offline"));
    });

    expect(queryByLabelText("Info link online")).toBeNull();
    expect(queryByLabelText("Info link offline")).toBeTruthy();
    expect(asFragment()).toMatchSnapshot();

    fireEvent.click(getByLabelText("Info link offline"));
    expect(queryByLabelText("Offline info dialog")).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });
});
