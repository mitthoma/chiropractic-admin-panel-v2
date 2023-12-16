import {
  updateTreatment,
  deleteTreatment,
} from "~/server/repositories/treatmentRepository";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // Handle side field mapping
  if (body.side === "Left") {
    body.side = "l";
  } else if (body.side === "Right") {
    body.side = "r";
  } else if (body.side === "Both") {
    body.side = "b";
  }

  // Delete treatment if no side is specified
  if (!body.side) {
    const res = await deleteTreatment(body.id);
    if (res) {
      console.log("Treatment successfully deleted");
    }
    return res;
  }

  // Define boolean fields specific to treatment entity
  const booleanFields = [
    "coldPack",
    "hotPack",
    "electStim",
    "traction",
    "massage",
    "treatmentManipulation",
  ];

  // Handle boolean fields logic
  booleanFields.forEach((field) => {
    if (body[field] === null) {
      body[field] = false;
    } else if (typeof body[field] === "string") {
      body[field] = body[field].toLowerCase() === "true";
    }
  });

  // Update the treatment in the database
  const response = await updateTreatment(body.id, body);
  return response;
});
