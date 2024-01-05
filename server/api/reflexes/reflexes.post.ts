import { addReflexes } from '~~/server/repositories/reports/reflexesRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const response = await addReflexes(body);
  return response;
});
