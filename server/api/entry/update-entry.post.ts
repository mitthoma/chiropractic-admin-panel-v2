import { updateEntry } from "~/server/typeorm/repositories/EntryRepository";

export default defineEventHandler(async event => {
    const body = await readBody(event);
    const response = await updateEntry(body.id, body);
    return response;
})