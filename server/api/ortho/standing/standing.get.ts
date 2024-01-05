import { getOrthoStandingById } from '~~/server/repositories/reports/orthoStandingRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const res = await getOrthoStandingById(body.id);
  return {
    data: res,
  };
});
