import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import ReviewForm from "../src/components/ReviewForm/ReviewForm";

// mock fetch
global.fetch = vi.fn();

beforeEach(() => {
  fetch.mockResolvedValue({
    ok: true,
    json: async () => ({}),
  });

  global.localStorage = {
    getItem: vi.fn(() => "fake-token"),
    setItem: vi.fn(),
  };
});

describe("ReviewForm integration", () => {
  it("envoie une review au backend", async () => {
    render(
      <BrowserRouter>
        <ReviewForm songId="123" />
      </BrowserRouter>,
    );

    fireEvent.change(screen.getByPlaceholderText("Review title"), {
      target: { value: "Top" },
    });

    fireEvent.change(screen.getByPlaceholderText("Your comment..."), {
      target: { value: "Super" },
    });

    fireEvent.change(screen.getByPlaceholderText("Rating (1-5)"), {
      target: { value: "5" },
    });

    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:5000/api/reviews",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          Authorization: "Bearer fake-token",
        }),
      }),
    );
  });
});
