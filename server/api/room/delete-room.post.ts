import { deleteRoom } from '~/server/repositories/roomRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const response = await deleteRoom(body.id);
  return response;
});
