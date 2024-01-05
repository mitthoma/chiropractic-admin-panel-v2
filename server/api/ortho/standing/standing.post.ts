import { addOrthoStanding } from '~~/server/repositories/reports/orthoStandingRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const response = await addOrthoStanding(body);
  return response;
});
