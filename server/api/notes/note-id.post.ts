import { getNoteById } from "~/server/repositories/noteRepository";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const res = await getNoteById(body.id);
  return {
    data: res,
  };
});
