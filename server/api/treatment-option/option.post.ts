import { getTreatmentOption } from '~~/server/repositories/treatmentOptionRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const res = await getTreatmentOption(parseInt(body.id));
  return {
    data: res,
  };
});
