import { addNewNote } from "~/server/repositories/noteRepository";

export default defineEventHandler(async event => {
    const body = await readBody(event);
    const formattedRoomAssignment2 = parseInt(body.phaseTwoRoomAssignment);
    const formattedRoomAssignment1 = parseInt(body.phaseOneRoomAssignment);
    const formattedRoomAssignment3 = parseInt(body.phaseThreeRoomAssignment);
    const formattedRoomAssignment4 = parseInt(body.phaseFourRoomAssignment);

    const formattedBody = {
        ...body,
        phaseOneRoomAssignment: formattedRoomAssignment1 || null,
        phaseTwoRoomAssignment:  formattedRoomAssignment2 || null,
        phaseThreeRoomAssignment: formattedRoomAssignment3 || null,
        phaseFourRoomAssignment: formattedRoomAssignment4 || null,
        weight: parseInt(body.weight) || null,
        temperature: parseInt(body.temperature) || null,
        systolic: parseInt(body.systolic) || null,
        diastolic: parseInt(body.diastolic) || null,
        heightInches: parseInt(body.heightInches) || null,
        heightFeet: parseInt(body.heightFeet) || null,
        tx: parseInt(body.tx) || null,
        physio: parseInt(body.physio) || null,
        respiration: parseInt(body.respiration) || null,
        pulse: parseInt(body.pulse) || null,

    }

    const response = await addNewNote(formattedBody, parseInt(body.patientId)); // using 1 as a test for now, but will need to parse the payload for the attendee ID
    return response;
})