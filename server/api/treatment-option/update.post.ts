import { updateOption } from '~~/server/repositories/treatmentOptionRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const response = await updateOption(body.id, body);
  return response;
});
