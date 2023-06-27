import { addEntry } from "~/server/repositories/entryRepository";

const requiredFields = [
  'sublux',
  'muscleSpasm',
  'triggerPoints',
  'tenderness',
  'numbness',
  'edema',
  'swelling',
  'reducedMotion',
  'coldPack',
  'hotPack',
  'electStim',
  'traction',
  'massage',
  'manipulation',
  'technique',
  'treatmentPositioning',
  'physioPositioning',
];

const booleanFields = [
  'sublux',
  'muscleSpasm',
  'triggerPoints',
  'tenderness',
  'numbness',
  'edema',
  'swelling',
  'reducedMotion',
  'coldPack',
  'hotPack',
  'electStim',
  'traction',
  'massage',
  'manipulation'
];

export default defineEventHandler(async event => {
  const body = await readBody(event);
  body.side = 'l';
  requiredFields.forEach(field => {
    if (!body.hasOwnProperty(field)) {
      if (field === 'technique' || field === 'treatmentPositioning' || field === 'physioPositioning') {
        body[field] = '';
      } else {
        body[field] = false;
      }
    }
  });

booleanFields.forEach(field => {
  if (body.hasOwnProperty(field)) {
    if (typeof body[field] === "boolean") {
    } else {
      body[field] = body[field] === 'true';
    }
  }
});

  if (body.spinalLevel) {
    body.category = 'spinal';
    body.spinalLevel = body.spinalLevel.toLowerCase();
  }
  else if (body.extremityLevel) {
    body.category = 'extremity';
    body.extremityLevel = body.extremityLevel.toLowerCase();
  }

  const response = await addEntry(body);
  return response;
})