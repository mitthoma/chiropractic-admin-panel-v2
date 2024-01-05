import { deleteOrthoSupine } from '~~/server/repositories/reports/orthoSupineRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const res = await deleteOrthoSupine(body.id);
  return res;
});
