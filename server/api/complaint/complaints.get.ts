import { getAllComplaints } from "~/server/repositories/complaintRepository";

export default defineEventHandler(async (event) => {
  const res = await getAllComplaints();
  return {
    data: res,
  };
});
