import { getComplaintById } from "~/server/typeorm/repositories/ComplaintRepository";

export default defineEventHandler(async event => {
    const body = await readBody(event);
    const res = await getComplaintById(body.id);
    return {
        data: res
    }
})