import { addTreatment } from "~/server/repositories/treatmentRepository";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log('HITTING ADD TREATMENT ENDPOINT AND BODY IS ', body);
  const cleanedBody: any = {
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
    spinalLevel: null,
    extremityLevel: null,
  }

  if (cleanedBody.category === 'spinal') {
    cleanedBody.spinalLevel = body.level || null;
  } else if (cleanedBody.category === 'extremity') {
    cleanedBody.extremityLevel = body.level || null;
  }

  const response = await addTreatment(cleanedBody);
  return response;
});
