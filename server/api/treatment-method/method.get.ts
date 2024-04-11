import { getTreatmentMethodsById } from '~~/server/repositories/treatmentMethodRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const res = await getTreatmentMethodsById(body.id);
  return {
    data: res,
  };
});
