import { getAllOrthoSeatedsByReportId } from '~~/server/repositories/reports/orthoSeatedRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const res = await getAllOrthoSeatedsByReportId(body.reportId);
  return {
    data: res,
  };
});
