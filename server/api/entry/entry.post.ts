import { addEntry } from "~/server/repositories/entryRepository";

export default defineEventHandler(async event => {
    const body = await readBody(event);
    body.tenderness = true;
    body.category = 'spinal'
    body.side = 'l'
    body.sublux = false
    body.muscleSpasm = false
    body.triggerPoints = false
    body.numbness = false
    body.edema = false
    body.swelling = false
    body.reducedMotion = false
    body.coldPack = false
    body.hotPack = false
    body.electStim = false
    body.traction = false
    body.massage = false
    body.technique = 'test'
    body.manipulation = false
    body.treatmentPositioning = 'test'
    body.physioPositioning = 'test'
    const response = await addEntry(body); // TODO: using example as a test for now, but will need to parse the payload for the note ID
    return response;
})