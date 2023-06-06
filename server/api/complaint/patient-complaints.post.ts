import { getComplaintsByPatientId } from "~/server/typeorm/repositories/ComplaintRepository";

export default defineEventHandler(async event => {
    const body = await readBody(event);
    const res = await getComplaintsByPatientId(body.patientId);
    return {
        data: res
    }
})