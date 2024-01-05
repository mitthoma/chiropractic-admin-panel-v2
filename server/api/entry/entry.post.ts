import { addEntry } from '~/server/repositories/entryRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const cleanedBody: any = {
    category: body.type,
    region: body.region || null,
    side: body.side,
    sublux: !!(body.sublux === 'X' || body.sublux === true),
    muscleSpasm: !!(body.muscleSpasm === 'X' || body.muscleSpasm === true),
    triggerPoints: !!(
      body.triggerPoints === 'X' || body.triggerPoints === true
    ),
    tenderness: !!(body.tenderness === 'X' || body.tenderness === true),
    numbness: !!(body.numbness === 'X' || body.numbness === true),
    edema: !!(body.edema === 'X' || body.edema === true),
    swelling: !!(body.swelling === 'X' || body.swelling === true),
    reducedMotion: !!(
      body.reducedMotion === 'X' || body.reducedMotion === true
    ),
    coldPack: !!(body.coldPack === 'X' || body.coldPack === true),
    hotPack: !!(body.hotPack === 'X' || body.hotPack === true),
    electStim: !!(body.electStim === 'X' || body.electStim === true),
    traction: !!(body.traction === 'X' || body.traction === true),
    massage: !!(body.massage === 'X' || body.massage === true),
    technique: body.technique || null,
    manipulation: !!(body.manipulation === 'X' || body.manipulation === true),
    note: body.noteId || null,
    physioPositioning: body.physioPositioning || null,
    treatmentPositioning: body.treatmentPositioning || null,
    spinalLevel: null,
    extremityLevel: null,
  };

  if (cleanedBody.category === 'spinal') {
    cleanedBody.spinalLevel = body.level || null;
  } else if (cleanedBody.category === 'extremity') {
    cleanedBody.extremityLevel = body.level || null;
  }

  const response = await addEntry(cleanedBody);
  return response;
});
