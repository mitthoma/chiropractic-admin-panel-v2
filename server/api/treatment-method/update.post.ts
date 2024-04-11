import { updateTreatmentMethod } from '~~/server/repositories/treatmentMethodRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const response = await updateTreatmentMethod(body.id, body);
  return response;
});
