
import { addNewComplaint } from "~/server/repositories/complaintRepository";

export default defineEventHandler(async event => {
    const body = await readBody(event);

    const response = await addNewComplaint(body, body.note_id);
    return response;
})