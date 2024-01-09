import { getAllReflexessByReportId } from '~~/server/repositories/reports/reflexesRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const res = await getAllReflexessByReportId(body.reportId);
  return {
    data: res,
  };
});
