import { db, type User } from "@/lib/firestore";

export const findUserByDeviceUid = async (deviceUid: string): Promise<User | null> => {
  const snap = await db.collection("users").where("deviceUid", "==", deviceUid).limit(1).get();

  if (snap.empty) return null;

  const user = snap.docs[0].data() as User;
  user.ref = snap.docs[0].ref;

  return user;
};
