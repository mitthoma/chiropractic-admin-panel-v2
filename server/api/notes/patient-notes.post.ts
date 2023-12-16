import { getNotesByPatientId } from "~/server/repositories/noteRepository";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const res = await getNotesByPatientId(parseInt(body.patientId)); // TODO: double check if this is 'patientId' or 'id'
  return {
    data: res,
  };
});
