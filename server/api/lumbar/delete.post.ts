import { deleteLumbar } from '~~/server/repositories/reports/lumbarRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const res = await deleteLumbar(body.id);
  return res;
});
