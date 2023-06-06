
import { addNewNote } from "~/server/typeorm/repositories/NoteRepository";

export default defineEventHandler(async event => {
    const body = await readBody(event);
    const response = await addNewNote(body, body.patientId); // using 1 as a test for now, but will need to parse the payload for the attendee ID
    return response;
})