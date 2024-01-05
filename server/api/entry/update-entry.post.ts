import {
  updateEntry,
  deleteEntry,
} from '~/server/repositories/entryRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body.side) {
    await deleteEntry(body.id);
    return;
  }
  const cleanedBody: any = {
    id: body.id,
    createdDate: body.createdDate,
    category: body.category,
    region: body.region,
    spinalLevel: body.spinalLevel,
    extremityLevel: body.extremityLevel,
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
    noteId: body.noteId || null,
    physioPositioning: body.physioPositioning || null,
    treatmentPositioning: body.treatmentPositioning || null,
  };
  const response = await updateEntry(cleanedBody);
  return response;
});
