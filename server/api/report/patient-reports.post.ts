import { getReportsByPatientId } from '~~/server/repositories/reports/reportRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const res = await getReportsByPatientId(parseInt(body.patientId));
  return {
    data: res,
  };
});
