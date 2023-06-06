import { deleteComplaint } from "~/server/typeorm/repositories/ComplaintRepository";

export default defineEventHandler(async event => {
    const body = await readBody(event);
    const response = await deleteComplaint(body.id);
    return response;
})