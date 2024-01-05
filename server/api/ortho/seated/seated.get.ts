import { getOrthoSeatedById } from '~~/server/repositories/reports/orthoSeatedRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const res = await getOrthoSeatedById(body.id);
  return {
    data: res,
  };
});
