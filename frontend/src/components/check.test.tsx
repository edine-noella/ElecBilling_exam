import { describe, it, expect } from "vitest";
import { render, screen } from "../utils/test-utils";
import Check from "./check";

describe("Buy component", () => {
  it("Should render buy component", () => {
    render(<Check />);

    expect(screen.getByText("Check your meter")).toBeInTheDocument();
  });
});
