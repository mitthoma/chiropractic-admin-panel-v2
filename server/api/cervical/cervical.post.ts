import { addCervical } from '~~/server/repositories/reports/cervicalRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const response = await addCervical(body);
  return response;
});
