import { updateLumbar } from '~~/server/repositories/reports/lumbarRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const response = await updateLumbar(body.id, body);
  return response;
});
