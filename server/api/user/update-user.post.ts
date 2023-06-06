import { updateUser } from "~/server/typeorm/repositories/UserRepository";

export default defineEventHandler(async event => {
    const body = await readBody(event);
    const response = await updateUser(body.id, body);
    return response;
})