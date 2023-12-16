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

  console.log("HITTING ENDPOINT FOR TREATMENT ADD");

  // Initialize fields with default values if not present in the request body
  requiredFields.forEach((field) => {
    if (!body.hasOwnProperty(field)) {
      if (booleanFields.includes(field)) {
        body[field] = false;
      } else if (
        field === "physioPositioning" ||
        field === "treatmentPositioning"
      ) {
        body[field] = null; // Assuming these fields are integers
      } else {
        body[field] = ""; // For string fields
      }
    }
  });

  // Ensure boolean fields are correctly interpreted
  booleanFields.forEach((field) => {
    if (body.hasOwnProperty(field)) {
      body[field] = body[field] === "true" || body[field] === true;
    }
  });

  // Lowercase transformation for enums if needed
  if (body.spinalLevel) {
    body.spinalLevel = body.spinalLevel.toLowerCase();
    body.category = "spinal";
    body.extremityLevel = null;
  }
  if (body.extremityLevel) {
    body.extremityLevel = body.extremityLevel.toLowerCase();
    body.category = "extremity";
    body.spinalLevel = null;
  }
  body.region = null;

  if (!body.side) {
    return;
  }

  // Call the repository function to add the treatment
  const response = await addTreatment(body);
  return response;
});
