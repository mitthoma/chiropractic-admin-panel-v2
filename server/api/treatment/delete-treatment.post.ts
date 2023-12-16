import { deleteTreatment } from "~/server/repositories/treatmentRepository";

export default defineEventHandler(async event => {
    const body = await readBody(event);
    const response = await deleteTreatment(body.id);
    return response;
})