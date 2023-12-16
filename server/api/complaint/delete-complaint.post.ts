import { deleteComplaint } from "~/server/repositories/complaintRepository";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const response = await deleteComplaint(body.id);
  return response;
});
