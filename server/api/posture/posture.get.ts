import { getPostureById } from '~~/server/repositories/reports/postureRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const res = await getPostureById(body.id);
  return {
    data: res,
  };
});
