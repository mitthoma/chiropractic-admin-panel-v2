import { addEntry } from "~/server/typeorm/repositories/EntryRepository";

export default defineEventHandler(async event => {
    const body = await readBody(event);
    const response = await addEntry(body, body.noteId); // TODO: using example as a test for now, but will need to parse the payload for the note ID
    return response;
})