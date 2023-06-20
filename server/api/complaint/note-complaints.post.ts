import { getComplaintsByNoteId } from "~/server/repositories/complaintRepository";

export default defineEventHandler(async event => {
    const body = await readBody(event);
    const res = await getComplaintsByNoteId(body.noteId);
    return {
        data: res
    }
})