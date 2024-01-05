import { addNewReport } from '~~/server/repositories/reports/reportRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const res = await addNewReport(body, parseInt(body.patientId));
  return res;
});
