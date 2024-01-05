import { getAllUsers } from '~~/server/repositories/userRepository';

export default defineEventHandler(async () => {
  const res = await getAllUsers();
  return {
    data: res,
  };
});
