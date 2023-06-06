import { getPatient } from "~/server/repositories/patientRepository";

export default defineEventHandler(async event => {
    const body = await readBody(event);
    const res = await getPatient(body.id);
    return {
        data: res
    }
})