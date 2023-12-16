import { getAllNotes } from "~/server/repositories/noteRepository";

export default defineEventHandler(async (event) => {
  const res = await getAllNotes();
  console.log("response is ", res);
  return {
    data: res,
  };
});
