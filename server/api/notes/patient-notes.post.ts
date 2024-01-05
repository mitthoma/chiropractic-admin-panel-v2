import { getNotesByPatientId } from '~/server/repositories/noteRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const res = await getNotesByPatientId(parseInt(body.patientId));
  return {
    data: res,
  };
});
