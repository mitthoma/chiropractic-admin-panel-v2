import { saveNewPatient } from '~/server/repositories/patientRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const response = await saveNewPatient(body);
  return response;
});
