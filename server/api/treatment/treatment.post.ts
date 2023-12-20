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
  

  console.log("calling treatment/treatment repository function");
  const response = await addTreatment(body);
  console.log('response is ', response);
  return response;
});
