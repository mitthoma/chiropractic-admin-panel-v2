import { saveNewUser } from "~/server/repositories/userRepository";

export default defineEventHandler(async event => {
    const body = await readBody(event);
    const response = await saveNewUser(body);
    return response;
})