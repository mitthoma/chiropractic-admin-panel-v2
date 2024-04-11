import { getTreatmentMethodNameById } from '~~/server/repositories/treatmentMethodNameRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const res = await getTreatmentMethodNameById(body.id);
  return {
    data: res,
  };
});
