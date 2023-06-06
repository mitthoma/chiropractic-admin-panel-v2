import { updateNote } from "~/server/typeorm/repositories/NoteRepository";

export default defineEventHandler(async event => {
    const body = await readBody(event);
    const response = await updateNote(body.id, body);
    return response;
})