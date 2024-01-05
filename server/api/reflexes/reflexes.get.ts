import { getReflexesById } from '~~/server/repositories/reports/reflexesRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const res = await getReflexesById(body.id);
  return {
    data: res,
  };
});
