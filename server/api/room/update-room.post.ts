import { updateRoom } from "~/server/repositories/roomRepository";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const response = await updateRoom(body.id, body);
  return response;
});
