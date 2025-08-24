import dotenv from "dotenv";
import { cleanEnv, str, port } from "envalid";

// Load environment variables from .env
dotenv.config({ path: "../.env" });

// Validate and sanitize environment variables
const env = cleanEnv(process.env, {
  PORT: port({ default: 3001 }),
  DATABASE_URL: str({ desc: "Database connection URL" }),
  NODE_ENV: str({
    choices: ["development", "production", "test"],
    default: "development",
  }),
});

export const config = {
  port: env.PORT,
  databaseUrl: env.DATABASE_URL,
  nodeEnv: env.NODE_ENV,
  isDev: env.NODE_ENV === "development",
};
