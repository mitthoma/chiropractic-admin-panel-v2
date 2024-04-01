import { addEntry } from '~/server/repositories/entryRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const response = await addEntry(body);
  return response;
});
