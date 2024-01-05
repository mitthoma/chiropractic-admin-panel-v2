import { deletePosture } from '~~/server/repositories/reports/postureRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const res = await deletePosture(body.id);
  return res;
});
