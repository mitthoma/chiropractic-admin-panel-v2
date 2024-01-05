import { addOrthoProne } from '~~/server/repositories/reports/orthoProneRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const res = await addOrthoProne(body);
  return res;
});
