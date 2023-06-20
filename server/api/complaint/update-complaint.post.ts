import { updateComplaint } from "~/server/repositories/complaintRepository";

export default defineEventHandler(async event => {
    const body = await readBody(event);
    console.log('BODY IS ', body);
    const response = await updateComplaint(body.id, body);
    return response;
})