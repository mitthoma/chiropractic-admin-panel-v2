
import { addNewComplaint } from "~/server/typeorm/repositories/ComplaintRepository";

export default defineEventHandler(async event => {
    const body = await readBody(event);
    const response = await addNewComplaint(body, body.patientId);
    return response;
})