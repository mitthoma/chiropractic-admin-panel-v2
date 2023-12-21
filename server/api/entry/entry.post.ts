import { addEntry } from "~/server/repositories/entryRepository";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log('CALLING NEW ENTRY');
  const cleanedBody: any = {
    category: body.type,
    region: body.region || null,
    side: body.side,
    sublux: body.sublux === 'X' || body.sublux === true ? true : false,
    muscleSpasm: body.muscleSpasm === 'X' || body.muscleSpasm === true ? true : false,
    triggerPoints: body.triggerPoints === 'X' || body.triggerPoints === true ? true : false,
    tenderness: body.tenderness === 'X' || body.tenderness === true ? true : false,
    numbness: body.numbness === 'X' || body.numbness === true ? true : false,
    edema: body.edema === 'X' || body.edema === true ? true : false,
    swelling: body.swelling === 'X' || body.swelling === true ? true : false,
    reducedMotion: body.reducedMotion === 'X' || body.reducedMotion === true ? true : false,
    coldPack: body.coldPack === 'X' || body.coldPack === true ? true : false,
    hotPack: body.hotPack === 'X' || body.hotPack === true ? true : false,
    electStim: body.electStim === 'X' || body.electStim === true ? true : false,
    traction: body.traction === 'X' || body.traction === true ? true : false,
    massage: body.massage === 'X' || body.massage === true ? true : false,
    technique: body.technique || null,
    manipulation: body.manipulation === 'X' || body.manipulation === true ? true : false,
    note: body.noteId || null,
    physioPositioning: body.physioPositioning || null,
    treatmentPositioning: body.treatmentPositioning || null,
    spinalLevel: null,
    extremityLevel: null,
  }

  if (cleanedBody.category === 'spinal') {
    cleanedBody.spinalLevel = body.level || null;
  } else if (cleanedBody.category === 'extremity') {
    cleanedBody.extremityLevel = body.level || null;
  }


  const response = await addEntry(cleanedBody);
  return response;
});
