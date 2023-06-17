
import { format } from "path";
import { addNewNote } from "~/server/repositories/noteRepository";

export default defineEventHandler(async event => {
    const body = await readBody(event);
    console.log('r2 assignment ', body.phaseTwoRoomAssignment)
    console.log(typeof body.phaseTwoRoomAssignment);
    console.log('r2 assignment ', parseInt(body.phaseTwoRoomAssignment));
    console.log(typeof parseInt(body.phaseTwoRoomAssignment));
    const formattedRoomAssignment = parseInt(body.phaseTwoRoomAssignment);

    const formattedBody = {
        ...body,
        phaseOneRoomAssignment: parseInt(body.phaseOneRoomAssignment) as number,
        phaseTwoRoomAssignment:  formattedRoomAssignment,
        phaseThreeRoomAssignment: parseInt(body.phaseThreeRoomAssignment),
        phaseFourRoomAssignment: parseInt(body.phaseFourRoomAssignment),
        weight: parseInt(body.weight),
        heightInches: parseInt(body.heightInches),
        heightFeet: parseInt(body.heightFeet),
        tx: parseInt(body.tx),
        physio: parseInt(body.physio),
    }

    console.log('typeof phaseOneRoomAssignment is ', typeof parseInt(formattedBody.phaseOneRoomAssignment));
    console.log('typeof phaseTwoRoomAssignment is ', typeof parseInt(formattedBody.phaseTwoRoomAssignment));

    const response = await addNewNote(formattedBody, parseInt(body.patientId)); // using 1 as a test for now, but will need to parse the payload for the attendee ID
    return response;
})