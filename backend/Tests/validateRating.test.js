import { describe, it, expect } from "vitest";
import { validateRating } from "./validateRating";

describe("validateRating", () => {
  it("accepte 1 à 5", () => {
    expect(validateRating(3)).toBe(true);
    expect(validateRating(1)).toBe(true);
    expect(validateRating(5)).toBe(true);
  });

  it("refuse valeurs invalides", () => {
    expect(validateRating(0)).toBe(false);
    expect(validateRating(10)).toBe(false);
  });
});
