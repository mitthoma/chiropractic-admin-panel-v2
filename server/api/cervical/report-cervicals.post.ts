import { getAllCervicalsByReportId } from '~~/server/repositories/reports/cervicalRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const res = await getAllCervicalsByReportId(body.reportId);
  return {
    data: res,
  };
});
