import { getAllMyoDermsByReportId } from '~~/server/repositories/reports/myoDermRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const res = await getAllMyoDermsByReportId(body.reportId);
  return {
    data: res,
  };
});
