import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  use: {
    baseURL: "http://127.0.0.1:3117",
    channel: "msedge",
    trace: "retain-on-failure",
  },
  webServer: {
    command: `"${process.execPath}" .output/server/index.mjs`,
    url: "http://127.0.0.1:3117",
    env: { PORT: "3117", HOST: "127.0.0.1" },
    reuseExistingServer: false,
  },
});
