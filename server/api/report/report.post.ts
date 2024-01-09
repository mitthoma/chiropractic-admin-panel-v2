import { addNewReport } from '~~/server/repositories/reports/reportRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log('body is ', body);
  const cleanedBody = {
    patientId: body.patientId,
    exam_date: body.exam_date,
  };
  console.log('cleanedbody is ', cleanedBody);
  const res = await addNewReport(cleanedBody, parseInt(cleanedBody.patientId));
  return res;
});
