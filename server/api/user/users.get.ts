import { getAllUsers } from "~/server/typeorm/repositories/UserRepository";

export default defineEventHandler(async event => {
    const res = await getAllUsers();
    return {
        data: res
    }
})