import { getAllTreatmentOptions } from '~~/server/repositories/treatmentOptionRepository';

export default defineEventHandler(async () => {
  const res = await getAllTreatmentOptions();
  return {
    data: res,
  };
});
