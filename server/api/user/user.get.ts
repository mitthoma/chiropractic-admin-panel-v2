import { getUser } from "~~/server/repositories/userRepository";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const res = await getUser(body.id);
  return {
    data: res,
  };
});
