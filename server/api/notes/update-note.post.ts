import { updateNote } from "~/server/repositories/noteRepository";

export default defineEventHandler(async event => {
    const body = await readBody(event);
    console.log('BODY BEFORE NOTE IS PASSED IS ', body);
    
    const noteToPass = {
        temperature: body.temperature ? parseInt(body.temperature) : null,
        respiration: body.respiration ? parseInt(body.respiration) : null,
        systolic: body.systolic ? parseInt(body.systolic) : null,
        diastolic: body.diastolic ? parseInt(body.diastolic) : null,
        physiotherapy: body.physiotherapy ? parseInt(body.physiotherapy) : null,
        physio: body.physio ? parseInt(body.physio) : null,
        tx: body.tx ? parseInt(body.tx) : null,
        patientId: body.patientId ? parseInt(body.patientId) : null,
        pulse: body.pulse ? parseInt(body.pulse) : null,
    }

    const response = await updateNote(body.id, noteToPass);
    return response;
})