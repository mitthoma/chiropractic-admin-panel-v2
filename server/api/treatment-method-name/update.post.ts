import { updateTreatmentMethodName } from '~~/server/repositories/treatmentMethodNameRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const response = await updateTreatmentMethodName(body.id, body);
  return response;
});
