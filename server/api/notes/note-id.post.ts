import { getNoteById } from "~/server/typeorm/repositories/NoteRepository";

export default defineEventHandler(async event => {
    const body = await readBody(event);
    const res = await getNoteById(body.id);
    return {
        data: res
    }
})