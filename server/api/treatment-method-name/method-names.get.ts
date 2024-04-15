import { getAllTreatmentMethodNames } from '~~/server/repositories/treatmentMethodNameRepository';

export default defineEventHandler(async () => {
  const res = await getAllTreatmentMethodNames();
  return {
    data: res,
  };
});
