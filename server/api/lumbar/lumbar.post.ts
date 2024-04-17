import { addLumbar } from '~~/server/repositories/reports/lumbarRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const res = await addLumbar(body);
  return res;
});
