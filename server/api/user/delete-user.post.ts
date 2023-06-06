
import { deleteUser } from "~/server/typeorm/repositories/UserRepository";

export default defineEventHandler(async event => {
    const body = await readBody(event);
    const response = await deleteUser(body.id);
    return response;
})