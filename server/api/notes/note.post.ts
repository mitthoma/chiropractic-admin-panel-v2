
import { format } from "path";
import { addNewNote } from "~/server/repositories/noteRepository";

export default defineEventHandler(async event => {
    const body = await readBody(event);
    const formattedBody = {
        phaseOneRoomAssignment: parseInt(body.phaseOneRoomAssignment),
        phaseTwoRoomAssignment:  parseInt(body.phaseTwoRoomAssignment),
        phaseThreeRoomAssignment: parseInt(body.phaseThreeRoomAssignment),
        phaseFourRoomAssignment: parseInt(body.phaseFourRoomAssignment),
        weight: parseInt(body.weight),
        heightInches: parseInt(body.heightInches),
        heightFeet: parseInt(body.heightFeet),
        ...body
    }

    console.log('typeof phaseOneRoomAssignment is ', typeof parseInt(formattedBody.phaseOneRoomAssignment));
    const response = await addNewNote(formattedBody, parseInt(body.patientId)); // using 1 as a test for now, but will need to parse the payload for the attendee ID
    return response;
})