import { getAllPosturesByReportId } from '~~/server/repositories/reports/postureRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const res = await getAllPosturesByReportId(body.reportId);
  return {
    data: res,
  };
});
