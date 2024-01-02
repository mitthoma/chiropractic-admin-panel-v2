import { deletePatient } from "~/server/repositories/patientRepository";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const response = await deletePatient(body.id);
  return response;
});
