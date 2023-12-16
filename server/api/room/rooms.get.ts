import { getAllRooms } from "~/server/repositories/roomRepository";

export default defineEventHandler(async (event) => {
  const res = await getAllRooms();
  return {
    data: res,
  };
});
