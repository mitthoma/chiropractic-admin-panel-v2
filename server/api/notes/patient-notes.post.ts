import { getNotesByPatientId } from "~/server/typeorm/repositories/NoteRepository";

export default defineEventHandler(async event => {
    const body = await readBody(event);
    const res = await getNotesByPatientId(body.patientId); // TODO: double check if this is 'patientId' or 'id'
    return {
        data: res
    }
})