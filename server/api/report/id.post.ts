import { getReportById } from '~~/server/repositories/reports/reportRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const res = await getReportById(body.id);
  return {
    data: res,
  };
});
