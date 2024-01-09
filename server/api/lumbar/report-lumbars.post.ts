import { getAllLumbarsByReportId } from '~~/server/repositories/reports/lumbarRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const res = await getAllLumbarsByReportId(body.reportId);
  return {
    data: res,
  };
});
