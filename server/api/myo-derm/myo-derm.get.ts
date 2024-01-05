import { getMyoDermById } from '~~/server/repositories/reports/myoDermRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const res = await getMyoDermById(body.id);
  return {
    data: res,
  };
});
