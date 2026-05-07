import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./tests/setup.js",
  },

  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./tests/setup.js",
    deps: {
      inline: ["@testing-library/react", "@testing-library/jest-dom"],
    },
  },
});
