import { getAllNotes } from '~/server/repositories/noteRepository';

export default defineEventHandler(async () => {
  const res = await getAllNotes();
  return {
    data: res,
  };
});
