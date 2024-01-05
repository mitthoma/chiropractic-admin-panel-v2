import { updateOrthoProne } from '~~/server/repositories/reports/orthoProneRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const response = await updateOrthoProne(body.id, body);
  return response;
});
