import { updateEntry } from '~/server/repositories/entryRepository';

export default defineEventHandler(async (event) => {
  console.log('HITTING ENTRY UPDATE ROUTE');
  const body = await readBody(event);
  const response = await updateEntry(body);
  return response;
});
