import {
  DocumentReference,
  FieldValue,
  Firestore,
  Timestamp,
  Transaction,
} from "@google-cloud/firestore";
import { env } from "@/env";

const projectId = env.FIRESTORE_PROJECT_ID;

export const db = new Firestore({ projectId });

export { Timestamp, FieldValue, DocumentReference, Transaction };

export const Kind = {
  In: 1,
  Out: 2,
} as const;

export type KindType = (typeof Kind)[keyof typeof Kind];

export type User = {
  userId: string;
  name: string;
  deviceId: string;
  ref: DocumentReference;
};

export type Event = {
  userRef: DocumentReference;
  kind: KindType;
  readAt: Timestamp;
};
