import { updatePatient } from "~/server/typeorm/repositories/PatientRepository";

export default defineEventHandler(async event => {
    const body = await readBody(event);
    const response = await updatePatient(body.id, body);
    return response;
})