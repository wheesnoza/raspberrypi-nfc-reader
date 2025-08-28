import { config } from "dotenv";
import { cleanEnv, num, str, bool } from "envalid";

config();

export const env = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ["development", "test", "production"], default: "production" }),
  PORT: num({ default: 3000 }),
  CORS_ORIGINS: str({ default: "" }),
  HSTS: bool({ default: true }),
  FIRESTORE_PROJECT_ID: str(),
  FIRESTORE_EMULATOR_HOST: str()
});

export function parseOrigins(originsCsv: string): string[] | undefined {
  const list = originsCsv
    .split(",")
    .map(s => s.trim())
    .filter(Boolean);
  return list.length ? list : undefined;
}
