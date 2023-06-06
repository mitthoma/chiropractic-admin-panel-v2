
import { deletePatient } from "~/server/typeorm/repositories/PatientRepository";

export default defineEventHandler(async event => {
    const body = await readBody(event);
    const response = await deletePatient(body.id);
    return response;
})