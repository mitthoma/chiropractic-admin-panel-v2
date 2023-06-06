import { saveNewUser } from "~/server/typeorm/repositories/UserRepository";

export default defineEventHandler(async event => {
    const body = await readBody(event);
    const response = await saveNewUser(body);
    return response;
})