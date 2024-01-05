import { deleteNote } from '~/server/repositories/noteRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const response = await deleteNote(body.noteId);
  return response;
});
