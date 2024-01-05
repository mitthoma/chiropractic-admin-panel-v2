import { deleteMyoDerm } from '~~/server/repositories/reports/myoDermRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const res = await deleteMyoDerm(body.id);
  return res;
});
