import { addOrthoSeated } from '~~/server/repositories/reports/orthoSeatedRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const response = await addOrthoSeated(body);
  return response;
});
