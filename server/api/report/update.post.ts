import { updateReport } from '~~/server/repositories/reports/reportRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const response = await updateReport(body.id, body);
  return response;
});
