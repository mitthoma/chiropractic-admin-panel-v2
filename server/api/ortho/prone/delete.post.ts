import { deleteOrthoProne } from '~~/server/repositories/reports/orthoProneRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const res = await deleteOrthoProne(body.id);
  return res;
});
