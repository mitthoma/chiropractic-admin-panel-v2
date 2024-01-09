import { updateMyoDerm } from '~~/server/repositories/reports/myoDermRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const response = await updateMyoDerm(body.id, body);
  return response;
});
