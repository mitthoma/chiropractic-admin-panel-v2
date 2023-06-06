import { deleteEntry } from "~/server/repositories/entryRepository";

export default defineEventHandler(async event => {
    const body = await readBody(event);
    const response = await deleteEntry(body.id); // TODO: using example as a test for now, but will need to parse the payload for the note ID
    return response;
})