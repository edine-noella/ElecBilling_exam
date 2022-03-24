import { describe, it, expect } from "vitest";
import { render, screen } from "../utils/test-utils";
import Buy from "./buy";

describe("Buy component", () => {
  it("Should render buy component", () => {
    render(<Buy />);

    expect(screen.getByText("Buy new package")).toBeInTheDocument();
  });
});
