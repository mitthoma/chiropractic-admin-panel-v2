import { deleteReport } from '~~/server/repositories/reports/reportRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const response = await deleteReport(body.reportId);
  return response;
});
