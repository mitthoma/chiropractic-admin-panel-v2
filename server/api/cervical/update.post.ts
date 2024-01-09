import { updateCervical } from '~~/server/repositories/reports/cervicalRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const response = await updateCervical(body.id, body);
  return response;
});
