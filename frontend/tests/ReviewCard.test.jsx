import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

function SimpleComponent() {
  return <h1>Music Review</h1>;
}

describe("SimpleComponent", () => {
  it("affiche le titre", () => {
    render(<SimpleComponent />);

    expect(screen.getByText("Music Review")).toBeInTheDocument();
  });
});
