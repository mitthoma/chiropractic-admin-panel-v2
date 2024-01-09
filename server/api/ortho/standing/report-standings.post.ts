import { getAllOrthoStandingsByReportId } from '~~/server/repositories/reports/orthoStandingRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const res = await getAllOrthoStandingsByReportId(body.reportId);
  return {
    data: res,
  };
});
