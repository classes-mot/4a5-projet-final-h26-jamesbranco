import { describe, it, expect } from "vitest";
import { validateReview } from "./validateReview";

describe("validateReview", () => {
  it("accepte une review valide", () => {
    const result = validateReview({
      title: "Super chanson",
      comment: "J'adore",
      rating: 5,
    });

    expect(result).toBe(true);
  });

  it("refuse une review sans titre", () => {
    const result = validateReview({
      title: "",
      comment: "test",
      rating: 4,
    });

    expect(result).toBe(false);
  });

  it("refuse une note invalide", () => {
    const result = validateReview({
      title: "test",
      comment: "test",
      rating: 10,
    });

    expect(result).toBe(false);
  });
});
