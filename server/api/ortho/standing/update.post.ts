import { updateOrthoStanding } from '~~/server/repositories/reports/orthoStandingRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const response = await updateOrthoStanding(body.id, body);
  return response;
});
