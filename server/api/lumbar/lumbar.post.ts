import { addLumbar } from '~~/server/repositories/reports/lumbarRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log('hitting lumbar add and body is ', body);
  const res = await addLumbar(body);
  console.log('res is ', res);
  return res;
});
