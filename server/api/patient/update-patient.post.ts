import { updatePatient } from '~/server/repositories/patientRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const cleanedBody = {
    ...body,
    heightFeet: body.heightFeet ? parseInt(body.heightFeet) : null,
    heightInches: body.heightInches ? parseInt(body.heightInches) : null,
    weight: body.weight ? parseInt(body.weight) : null,
  };

  const response = await updatePatient(body.id, cleanedBody);
  return response;
});
