import { addTreatment } from '~/server/repositories/treatmentRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  // const cleanedBody: any = {
  //   category: body.type,
  //   region: body.region || null,
  //   side: body.side,
  //   coldPack: !!(body.coldPack === 'X' || body.coldPack === true),
  //   hotPack: !!(body.hotPack === 'X' || body.hotPack === true),
  //   electStim: !!(body.electStim === 'X' || body.electStim === true),
  //   traction: !!(body.traction === 'X' || body.traction === true),
  //   massage: !!(body.massage === 'X' || body.massage === true),
  //   treatmentManipulation: !!(
  //     body.treatmentManipulation === 'X' || body.treatmentManipulation === true
  //   ),
  //   noteId: body.noteId || null,
  //   physioPositioning: body.physioPositioning || null,
  //   treatmentPositioning: body.treatmentPositioning || null,
  //   treatmentTechnique: body.treatmentTechnique || null,
  //   spinalLevel: null,
  //   extremityLevel: null,
  // };

  // if (cleanedBody.category === 'spinal') {
  //   cleanedBody.spinalLevel = body.level || null;
  // } else if (cleanedBody.category === 'extremity') {
  //   cleanedBody.extremityLevel = body.level || null;
  // }

  const response = await addTreatment(body);
  return response;
});
