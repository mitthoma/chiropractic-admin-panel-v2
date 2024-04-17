import { addNewReport } from '~~/server/repositories/reports/reportRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const cleanedBody = {
    patientId: body.patientId,
    exam_date: body.exam_date,
  };
  const res = await addNewReport(cleanedBody, parseInt(cleanedBody.patientId));
  return res;
});
