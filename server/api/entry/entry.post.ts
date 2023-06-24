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

  console.log('BODY IS ', body);

  body.side = 'l';

  // Set missing properties to false or empty strings for specific fields
  requiredFields.forEach(field => {
    if (!body.hasOwnProperty(field)) {
      if (field === 'technique' || field === 'treatmentPositioning' || field === 'physioPositioning') {
        body[field] = '';
      } else {
        body[field] = false;
      }
    }
  });

  // Convert any string boolean values to boolean
  booleanFields.forEach(field => {
    if (body.hasOwnProperty(field)) {
      body[field] = body[field] === 'true';
    }
  });

  // Set category field depending on spinalLevel or extremityLevel
  if (body.spinalLevel) {
    body.category = 'spinal';
    body.spinalLevel = body.spinalLevel.toLowerCase();
  }
  else if (body.extremityLevel) {
    body.category = 'extremity';
    body.extremityLevel = body.extremityLevel.toLowerCase();
  }

  const response = await addEntry(body); // TODO: using example as a test for now, but will need to parse the payload for the note ID
  return response;
})