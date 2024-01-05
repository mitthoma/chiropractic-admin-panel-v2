import { getComplaintsByPatientId } from '~/server/repositories/complaintRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const patientId = parseInt(body.patientId);
  const res = await getComplaintsByPatientId(patientId);
  return {
    data: res,
  };
});
