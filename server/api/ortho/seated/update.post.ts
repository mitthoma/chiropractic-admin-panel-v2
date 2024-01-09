import { updateOrthoSeated } from '~~/server/repositories/reports/orthoSeatedRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const response = await updateOrthoSeated(body.id, body);
  return response;
});
