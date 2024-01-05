import { deleteOrthoStanding } from '~~/server/repositories/reports/orthoStandingRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const res = await deleteOrthoStanding(body.id);
  return res;
});
