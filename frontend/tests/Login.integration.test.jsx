import { describe, it, expect, vi, beforeEach } from "vitest";

global.fetch = vi.fn();

describe("Login integration", () => {
  beforeEach(() => {
    // reset mock fetch
    fetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        token: "fake-token",
      }),
    });

    // mock localStorage propre
    global.localStorage = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    };
  });

  it("retourne un token depuis le backend", async () => {
    const res = await fetch("/api/users/login", {
      method: "POST",
    });

    const data = await res.json();

    expect(data.token).toBe("fake-token");
  });

  it("sauvegarde le token dans localStorage", async () => {
    const res = await fetch("/api/users/login", {
      method: "POST",
    });

    const data = await res.json();

    localStorage.setItem("token", data.token);

    expect(localStorage.setItem).toHaveBeenCalledWith("token", "fake-token");

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });
});
