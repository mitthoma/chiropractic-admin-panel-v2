import { getCervicalById } from '~~/server/repositories/reports/cervicalRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const res = await getCervicalById(body.id);
  return {
    data: res,
  };
});
