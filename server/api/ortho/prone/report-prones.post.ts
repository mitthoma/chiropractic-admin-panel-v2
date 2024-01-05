import { getAllOrthoPronesByReportId } from '~~/server/repositories/reports/orthoProneRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const res = await getAllOrthoPronesByReportId(body.reportId);
  return {
    data: res,
  };
});
