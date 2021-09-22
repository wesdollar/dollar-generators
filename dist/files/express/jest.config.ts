import type { Config } from "@jest/types";

// Sync object
const config: Config.InitialOptions = {
  roots: ["src"],
  setupFiles: ["dotenv/config"],
};

export default config;
