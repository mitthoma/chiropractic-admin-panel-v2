import { getAllTreatmentOptions } from "~~/server/repositories/treatmentOptionRepository";

export default defineEventHandler(async (event) => {
  const res = await getAllTreatmentOptions();
  return {
    data: res,
  };
});
