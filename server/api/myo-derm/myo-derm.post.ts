import { addMyoDerm } from '~~/server/repositories/reports/myoDermRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const response = await addMyoDerm(body);
  return response;
});
