import { addNewNote } from "~/server/repositories/noteRepository";

export default defineEventHandler(async event => {
    const body = await readBody(event);

    const formattedBody = {
        ...body,
        temperature: parseFloat(body.temperature) || null,
        systolic: parseInt(body.systolic) || null,
        diastolic: parseInt(body.diastolic) || null,
        tx: parseInt(body.tx) || null,
        physio: parseInt(body.physio) || null,
        respiration: parseInt(body.respiration) || null,
        pulse: parseInt(body.pulse) || null,
    }

    const response = await addNewNote(formattedBody, parseInt(body.patientId));
    return response;
})