import { getPatient } from "~/server/typeorm/repositories/PatientRepository";

export default defineEventHandler(async event => {
    const body = await readBody(event);
    const res = await getPatient(body.id);
    return {
        data: res
    }
})