import { getAllPatients } from '~/server/repositories/patientRepository';

export default defineEventHandler(async () => {
  const res = await getAllPatients();
  return {
    data: res,
  };
});
