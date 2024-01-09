import { deleteOrthoSeated } from '~~/server/repositories/reports/orthoSeatedRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const res = await deleteOrthoSeated(body.id);
  return res;
});
