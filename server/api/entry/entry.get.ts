import { getEntryById } from "~/server/repositories/entryRepository";

export default defineEventHandler(async event => {
    const body = await readBody(event);
    console.log('in get entry and body is ', body);
    const res = await getEntryById(body.id);
    return {
        data: res
    }
})