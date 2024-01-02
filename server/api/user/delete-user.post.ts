import { deleteUser } from "~~/server/repositories/userRepository";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const response = await deleteUser(body.id);
  return response;
});
