
import { deletePatient } from "~/server/repositories/patientRepository";

export default defineEventHandler(async event => {
    const body = await readBody(event);
    console.log('body is ', body);
    const response = await deletePatient(body.id);
    return response;
})