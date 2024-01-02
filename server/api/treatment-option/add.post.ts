import { saveNewOption } from "~~/server/repositories/treatmentOptionRepository";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const response = await saveNewOption(body);
  return response;
});
