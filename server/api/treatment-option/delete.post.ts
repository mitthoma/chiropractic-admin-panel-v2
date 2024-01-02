import { deleteOption } from "~~/server/repositories/treatmentOptionRepository";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const response = await deleteOption(body.id);
  return response;
});
