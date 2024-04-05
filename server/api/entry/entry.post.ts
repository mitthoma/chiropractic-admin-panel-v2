import { addEntry } from '~/server/repositories/entryRepository';

export default defineEventHandler(async (event) => {
  console.log('HITTING ENTRY POST ROUTE');
  const body = await readBody(event);
  const response = await addEntry(body);
  return response;
});
