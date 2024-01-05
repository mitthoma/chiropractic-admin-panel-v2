import { getTreatmentById } from '~/server/repositories/treatmentRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const res = await getTreatmentById(body.id);
  return {
    data: res,
  };
});
