import {
  updateEntry,
  deleteEntry,
} from "~/server/repositories/entryRepository";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log('HITTING AN UPDATE');
  console.log('body level is ', body.spinalLevel);
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
    noteId: body.noteId || null,
    physioPositioning: body.physioPositioning || null,
    treatmentPositioning: body.treatmentPositioning || null,
  }
  console.log('cleaned body is ', cleanedBody);
  console.log('cleanedBody.side is ', cleanedBody.side);
  const response = await updateEntry(cleanedBody);
  return response;
});
