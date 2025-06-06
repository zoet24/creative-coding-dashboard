import { render, screen } from "@testing-library/react";
import EmptyState from "./EmptyState";

describe("EmptyState", () => {
  it("renders the provided text", () => {
    render(<EmptyState text="Nothing to show here" />);
    expect(screen.getByText("Nothing to show here")).toBeInTheDocument();
  });

  it("applies correct styling", () => {
    render(<EmptyState text="Checking styles" />);
    const div = screen.getByText("Checking styles");
    expect(div).toHaveClass("text-sm", "text-gray-500");
  });
});
