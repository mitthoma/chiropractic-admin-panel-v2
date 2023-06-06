
import { deleteNote } from "~/server/typeorm/repositories/NoteRepository";

export default defineEventHandler(async event => {
    const body = await readBody(event);
    const response = await deleteNote(body.id);
    return response;
})