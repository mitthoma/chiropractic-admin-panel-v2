import { getAllNotes } from "~/server/typeorm/repositories/NoteRepository";

export default defineEventHandler(async event => {
    const res = await getAllNotes();
    console.log('response is ', res);
    return {
        data: res
    }
})