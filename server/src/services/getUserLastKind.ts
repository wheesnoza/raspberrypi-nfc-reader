import {
  type DocumentReference,
  db,
  type Event,
  type KindType,
  type Transaction,
} from "@/lib/firestore";

export const getUserLastKind = async (
  userRef: DocumentReference,
  transaction: Transaction | null = null,
): Promise<KindType | null> => {
  const query = db
    .collection("events")
    .where("userId", "==", userRef)
    .orderBy("readAt", "desc")
    .limit(1);
  let snap = null;

  if (transaction === null) {
    snap = await query.get();
  } else {
    snap = await transaction.get(query);
  }

  if (snap.empty) return null;

  const event = snap.docs[0].data() as Event;

  return event.kind;
};
