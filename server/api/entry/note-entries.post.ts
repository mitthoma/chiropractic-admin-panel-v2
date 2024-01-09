import { getAllEntriesByNoteId } from '~/server/repositories/entryRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const res = await getAllEntriesByNoteId(body.noteId);
  return {
    data: res,
  };
});
