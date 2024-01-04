import { getAllRooms } from '~/server/repositories/roomRepository';

export default defineEventHandler(async () => {
  const res = await getAllRooms();
  return {
    data: res,
  };
});
