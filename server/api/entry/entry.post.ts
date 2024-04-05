import { addEntry } from '~/server/repositories/entryRepository';

export default defineEventHandler(async (event) => {
  console.log('HITTING ENTRY POST ROUTE');
  const body = await readBody(event);
  console.log('body is ', body);
  if (body.noteId) {
    delete body.noteId;
  }
  const response = await addEntry(body);
  return response;
});
