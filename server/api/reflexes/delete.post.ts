import { deleteReflexes } from '~~/server/repositories/reports/reflexesRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const res = await deleteReflexes(body.id);
  return res;
});
