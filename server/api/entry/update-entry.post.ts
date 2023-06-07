import { updateEntry } from "~/server/repositories/entryRepository";

export default defineEventHandler(async event => {
    const body = await readBody(event);
    const response = await updateEntry(body.id, body);
    return response;
})