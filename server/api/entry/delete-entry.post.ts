import { deleteEntry } from '~/server/repositories/entryRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const res = await deleteEntry(body.id);
  return res;
});
