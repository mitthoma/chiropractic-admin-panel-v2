import { updatePosture } from '~~/server/repositories/reports/postureRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const response = await updatePosture(body.id, body);
  return response;
});
