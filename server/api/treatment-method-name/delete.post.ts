import { deleteTreatmentMethodName } from '~~/server/repositories/treatmentMethodNameRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const response = await deleteTreatmentMethodName(body.id);
  return response;
});
