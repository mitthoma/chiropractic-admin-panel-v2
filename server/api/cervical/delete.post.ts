import { deleteCervical } from '~~/server/repositories/reports/cervicalRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const res = await deleteCervical(body.id);
  return res;
});
