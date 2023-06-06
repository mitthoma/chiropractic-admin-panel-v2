import { saveNewPatient } from "~/server/typeorm/repositories/PatientRepository";

export default defineEventHandler(async event => {
    const body = await readBody(event);
    const response = await saveNewPatient(body);
    return response;
})