import { describe, expect, it } from "vitest";
import App from "./App";
import { render, screen } from "./utils/test-utils";
import { BrowserRouter as Router } from "react-router-dom";

describe("App", () => {
  it("should render main app", () => {
    render(
      <Router>
        <App />
      </Router>
    );
    expect(screen.getByText(/Electri-C/i)).toBeInTheDocument();
  });
});
