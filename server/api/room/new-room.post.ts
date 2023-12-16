import { saveNewRoom } from "~/server/repositories/roomRepository";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const response = await saveNewRoom(body);
  return response;
});
