import { updateComplaint } from "~/server/typeorm/repositories/ComplaintRepository";

export default defineEventHandler(async event => {
    const body = await readBody(event);
    const response = await updateComplaint(body.id, body);
    return response;
})