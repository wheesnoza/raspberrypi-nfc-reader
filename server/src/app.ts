import express from "express";
import cors from "cors";
import helmet from "helmet";
import { env, parseOrigins } from "./env.js";

export function createApp() {
  const app = express();

  app.use(
    helmet({
      contentSecurityPolicy: false,
      hsts: env.HSTS
    })
  );

  // CORS
  const origins = parseOrigins(env.CORS_ORIGINS);
  app.use(
    cors({
      origin: origins ?? true,
      credentials: true
    })
  );

  app.use(express.json());

  app.get("/health", (_req, res) => {
    console.log('health');
    res.status(200).json({ status: "ok", uptime: process.uptime() });
  });

  app.post("/api/scan", (req, res) => {
    console.log(req.body)
    res.status(201).json({status: "ok", uptime: process.uptime() });
  });

  app.use((_req, res) => {
    res.status(404).json({ error: "Not Found" });
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  });

  return app;
}
