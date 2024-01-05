import { getLumbarById } from '~~/server/repositories/reports/lumbarRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const res = await getLumbarById(body.id);
  return {
    data: res,
  };
});
