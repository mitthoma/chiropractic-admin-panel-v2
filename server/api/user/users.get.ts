import { getAllUsers } from "~~/server/repositories/userRepository";

export default defineEventHandler(async (event) => {
  const res = await getAllUsers();
  return {
    data: res,
  };
});
