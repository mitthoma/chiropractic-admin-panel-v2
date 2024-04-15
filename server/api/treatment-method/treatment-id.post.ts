import { findAllByTreatmentId } from '~~/server/repositories/treatmentMethodRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const res = await findAllByTreatmentId(body.treatmentId);
  return {
    data: res,
  };
});
