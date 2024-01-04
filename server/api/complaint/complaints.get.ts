import { getAllComplaints } from '~/server/repositories/complaintRepository';

export default defineEventHandler(async () => {
  const res = await getAllComplaints();
  return {
    data: res,
  };
});
