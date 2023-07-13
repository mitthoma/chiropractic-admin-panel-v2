import { getRoom } from "~/server/repositories/roomRepository";

export default defineEventHandler(async event => {
    const body = await readBody(event);
    const res = await getRoom(parseInt(body.id));
    return {
        data: res
    }
})