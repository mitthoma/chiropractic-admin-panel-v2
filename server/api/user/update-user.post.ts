import { updateUser } from "~/server/repositories/userRepository";

export default defineEventHandler(async event => {
    const body = await readBody(event);
    const response = await updateUser(body.id, body);
    return response;
})