import React from "react";
import { render } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer tests", () => {
  test("that snapshots match", () => {
    const { asFragment } = render(<Footer />);

    expect(asFragment()).toMatchSnapshot();
  });
});
