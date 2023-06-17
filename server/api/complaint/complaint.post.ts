
import { addNewComplaint } from "~/server/repositories/complaintRepository";

export default defineEventHandler(async event => {
    const body = await readBody(event);
    console.log('ADD COMPLAINT AND BODY IS ', body);
    const response = await addNewComplaint(body, body.noteId);
    return response;
})