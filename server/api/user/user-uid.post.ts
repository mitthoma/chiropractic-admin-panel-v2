import { getUserByFirebaseUid } from "~~/server/repositories/userRepository";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log("IN GET USER BY FIREBASE UID AND BODY IS ", body);
  const res = await getUserByFirebaseUid(body.firebaseUid);
  return {
    data: res,
  };
});
