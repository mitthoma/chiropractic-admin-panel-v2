import { updateNote } from "~/server/repositories/noteRepository";

export default defineEventHandler(async event => {
    const body = await readBody(event);
    console.log('BODY BEFORE NOTE IS PASSED IS ', body);
    
    const noteToPass = {
        heightFeet: body.heightFeet ? parseInt(body.heightFeet) : null,
        heightInches: body.heightInches ? parseInt(body.heightInches) : null,
        temperature: body.temperature ? parseInt(body.temperature) : null,
        respiration: body.respiration ? parseInt(body.respiration) : null,
        systolic: body.systolic ? parseInt(body.systolic) : null,
        diastolic: body.diastolic ? parseInt(body.diastolic) : null,
        physiotherapy: body.physiotherapy ? parseInt(body.physiotherapy) : null,
        // phaseOneRoomAssignment: body.phaseOneRoomAssignment ? parseInt(body.phaseOneRoomAssignment) : null,
        physio: body.physio ? parseInt(body.physio) : null,
        tx: body.tx ? parseInt(body.tx) : null,
        patientId: body.patientId ? parseInt(body.patientId) : null,
        pulse: body.pulse ? parseInt(body.pulse) : null,
        // phaseTwoRoomAssignment: body.phaseTwoRoomAssignment ? parseInt(body.phaseTwoRoomAssignment) : null,
        // phaseThreeRoomAssignment: body.phaseThreeRoomAssignment ? parseInt(body.phaseThreeRoomAssignment) : null,
        // phaseFourRoomAssignment: body.phaseFourRoomAssignment ? parseInt(body.phaseFourRoomAssignment) : null,
        weight: body.weight ? parseInt(body.weight) : null
    }

    const response = await updateNote(body.id, noteToPass);
    return response;
})