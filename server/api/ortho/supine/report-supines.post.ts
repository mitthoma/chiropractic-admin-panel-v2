import { getAllOrthoSupinesByReportId } from '~~/server/repositories/reports/orthoSupineRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const res = await getAllOrthoSupinesByReportId(body.reportId);
  return {
    data: res,
  };
});
