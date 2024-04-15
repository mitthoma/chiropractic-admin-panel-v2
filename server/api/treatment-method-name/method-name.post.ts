import { addTreatmentMethodName } from '~~/server/repositories/treatmentMethodNameRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const response = await addTreatmentMethodName(body.name);
  return response;
});
