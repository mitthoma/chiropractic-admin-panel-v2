import { updatePatient } from "~/server/repositories/patientRepository";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const response = await updatePatient(body.id, body);
  return response;
});
