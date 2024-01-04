import { getEntryById } from '~/server/repositories/entryRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const res = await getEntryById(body.id);
  return {
    data: res,
  };
});
