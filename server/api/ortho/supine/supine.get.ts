import { getOrthoSupineById } from '~~/server/repositories/reports/orthoSupineRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const res = await getOrthoSupineById(body.id);
  return {
    data: res,
  };
});
