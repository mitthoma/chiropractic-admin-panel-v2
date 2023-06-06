import { getAllEntriesByNoteId } from "~/server/typeorm/repositories/EntryRepository";

export default defineEventHandler(async event => {
    const body = await readBody(event);
    const res = await getAllEntriesByNoteId(body.noteId); // TODO: double check if this is 'noteId' or 'id'
    return {
        data: res
    }
})