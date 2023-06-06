import { getAllComplaints } from "~/server/typeorm/repositories/ComplaintRepository";

export default defineEventHandler(async event => {
    const res = await getAllComplaints();
    return {
        data: res
    }
})