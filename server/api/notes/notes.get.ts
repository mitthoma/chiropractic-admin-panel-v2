import { getAllNotes } from "~/server/repositories/noteRepository";

export default defineEventHandler(async (event) => {
  const res = await getAllNotes();
  return {
    data: res,
  };
});
