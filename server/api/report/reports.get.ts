import { getAllReports } from '~~/server/repositories/reports/reportRepository';

export default defineEventHandler(async () => {
  const res = await getAllReports();
  return {
    data: res,
  };
});
