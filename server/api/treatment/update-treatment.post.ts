import {
  updateTreatment,
  deleteTreatment,
} from "~/server/repositories/treatmentRepository";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body.side) {
    const res = await deleteTreatment(body.id);
    return res;
  }
  console.log('body on treatment is ', body);

  const cleanedBody: any = {
    id: body.id,
    category: body.type,
    region: body.region || null,
    side: body.side,
    coldPack: body.coldPack === 'X' || body.coldPack === true ? true : false,
    hotPack: body.hotPack === 'X' || body.hotPack === true ? true : false,
    electStim: body.electStim === 'X' || body.electStim === true ? true : false,
    traction: body.traction === 'X' || body.traction === true ? true : false,
    massage: body.massage === 'X' || body.massage === true ? true : false,
    treatmentManipulation: body.treatmentManipulation === 'X' || body.treatmentManipulation === true ? true : false,
    noteId: body.noteId || null,
    physioPositioning: body.physioPositioning || null,
    treatmentPositioning: body.treatmentPositioning || null,
    treatmentTechnique: body.treatmentTechnique || null,
    spinalLevel: body.category === 'spinal' ? body.spinalLevel : null,
    extremityLevel: body.category === 'extremity' ? body.extremityLevel : null,
  }


  const response = await updateTreatment(cleanedBody);
  return response;
});
