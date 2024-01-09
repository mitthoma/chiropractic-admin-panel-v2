import { addOrthoSupine } from '~~/server/repositories/reports/orthoSupineRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const response = await addOrthoSupine(body);
  return response;
});
