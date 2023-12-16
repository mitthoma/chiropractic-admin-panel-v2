import { getAllPatients } from "~/server/repositories/patientRepository";

export default defineEventHandler(async (event) => {
  const res = await getAllPatients();
  return {
    data: res,
  };
});
