import { updateNote } from "~/server/repositories/noteRepository";

export default defineEventHandler(async event => {
    const body = await readBody(event);
    const response = await updateNote(body.id, body);
    return response;
})