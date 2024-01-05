import { updateOrthoSupine } from '~~/server/repositories/reports/orthoSupineRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const response = await updateOrthoSupine(body.id, body);
  return response;
});
