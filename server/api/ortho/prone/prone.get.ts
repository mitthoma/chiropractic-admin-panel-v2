import { getOrthoProneById } from '~~/server/repositories/reports/orthoProneRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const res = await getOrthoProneById(body.id);
  return {
    data: res,
  };
});
