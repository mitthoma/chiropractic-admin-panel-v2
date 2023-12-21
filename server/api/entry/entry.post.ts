import { addEntry } from "~/server/repositories/entryRepository";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const cleanedBody: any = {
    category: body.type,
    region: body.region || null,
    side: body.side,
    sublux: body.sublux || false,
    muscleSpasm: body.muscleSpasm || false,
    triggerPoints: body.triggerPoints || false,
    tenderness: body.tenderness || false,
    numbness: body.numbness || false,
    edema: body.edema || false,
    swelling: body.swelling || false,
    reducedMotion: body.reducedMotion || false,
    coldPack: body.coldPack || false,
    hotPack: body.hotPack || false,
    electStim: body.electStim || false,
    traction: body.traction || false,
    massage: body.massage || false,
    technique: body.technique || null,
    manipulation: body.manipulation || false,
    noteId: body.noteId || null,
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
