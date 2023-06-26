import { updateEntry } from "~/server/repositories/entryRepository";

export default defineEventHandler(async event => {
    const body = await readBody(event);
    console.log('body incoming is ', body);

    // Change 'Left' to 'l', 'Right' to 'r' and 'Both' to 'b'
    if (body.side === 'Left') {
        body.side = 'l';
    } else if (body.side === 'Right') {
        body.side = 'r';
    } else if (body.side === 'Both') {
        body.side = 'b';
    }

    const response = await updateEntry(body.id, body);
    return response;
})