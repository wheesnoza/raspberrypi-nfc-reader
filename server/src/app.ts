import cors from "cors";
import express from "express";
import helmet from "helmet";
import { env, parseOrigins } from "@/env";
import { db, Timestamp } from "@/lib/firestore";
import { findUserByDeviceUid } from "@/services/findUserByDeviceUid";
import { getUserLastKind } from "@/services/getUserLastKind";
import { nextKind } from "@/services/nextKind";

export function createApp() {
  const app = express();

  app.use(
    helmet({
      contentSecurityPolicy: false,
      hsts: env.HSTS,
    }),
  );

  // CORS
  const origins = parseOrigins(env.CORS_ORIGINS);
  app.use(
    cors({
      origin: origins ?? true,
      credentials: true,
    }),
  );

  app.use(express.json());

  app.get("/health", (_req, res) => {
    console.log("health");
    res.status(200).json({ status: "ok", uptime: process.uptime() });
  });

  app.post("/device/read", async (req, res) => {
    const { device_uid, read_at } = req.body;
    const user = await findUserByDeviceUid(device_uid);
    if (user === null) return res.status(404).json({ message: "User not found." });
    try {
      db.runTransaction(async (transaction) => {
        const prevKind = await getUserLastKind(user.ref, transaction);
        const kind = nextKind(prevKind);
        const readAt = Timestamp.fromDate(new Date(read_at));
        const newRef = db.collection("events").doc();
        transaction.set(newRef, {
          userId: user.ref,
          kind,
          readAt,
        });
      });
      res.status(201).json({ ok: true });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  });

  app.use((_req, res) => {
    res.status(404).json({ error: "Not Found" });
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use(
    (err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    },
  );

  return app;
}
