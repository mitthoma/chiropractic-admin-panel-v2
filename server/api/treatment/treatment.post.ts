import { addTreatment } from "~/server/repositories/treatmentRepository";

const requiredFields = [
  "category",
  "region",
  "spinalLevel",
  "extremityLevel",
  "side",
  "physioPositioning",
  "coldPack",
  "hotPack",
  "electStim",
  "traction",
  "massage",
  "treatmentPositioning",
  "treatmentTechnique",
  "treatmentManipulation",
  "noteId",
];

const booleanFields = [
  "coldPack",
  "hotPack",
  "electStim",
  "traction",
  "massage",
  "treatmentManipulation",
];

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log('hitting treatment endpoint treatment/treatment and body is ', body);

  // Correctly set enum fields to null if they are not provided
  ['physioPositioning', 'treatmentPositioning', 'treatmentTechnique'].forEach((field) => {
    if (!body.hasOwnProperty(field) || body[field] === false) {
      body[field] = null;
    }
  });

  // Convert string 'true'/'false' to boolean for boolean fields
  booleanFields.forEach((field) => {
    if (body.hasOwnProperty(field)) {
      body[field] = body[field] === "true" || body[field] === true;
    }
  });

  // requiredFields.forEach((field) => {
  //   if (!body.hasOwnProperty(field)) {
  //     if (booleanFields.includes(field)) {
  //       body[field] = false;
  //     } else if (
  //       field === "physioPositioning" ||
  //       field === "treatmentPositioning" ||
  //       field === 'treatmentTechnique'
  //     ) {
  //       body[field] = null;
  //     } else {
  //       body[field] = "";
  //     }
  //   }
  // });

  console.log('getting here 2');

  if (body.spinalLevel) {
    body.spinalLevel = body.spinalLevel.toLowerCase();
    body.category = "spinal";
    body.extremityLevel = null;
  }
  console.log('getting here 3');
  if (body.extremityLevel) {
    body.extremityLevel = body.extremityLevel.toLowerCase();
    body.category = "extremity";
    body.spinalLevel = null;
  }
  console.log('getting here 4');
  body.region = null;

  console.log('body is ', body);

  if (!body.side) {
    console.log('getting here 5');
    return;
  }

  console.log("calling treatment/treatment repository function");
  const response = await addTreatment(body);
  console.log('response is ', response);
  return response;
});
