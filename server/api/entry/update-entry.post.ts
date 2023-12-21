import {
  updateEntry,
  deleteEntry,
} from "~/server/repositories/entryRepository";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log('CALLING UPDATE ENTRY');

  if (body.side === "Left") {
    body.side = "l";
  } else if (body.side === "Right") {
    body.side = "r";
  } else if (body.side === "Both") {
    body.side = "b";
  } else if (!body.side) {
    const res = await deleteEntry(body.id);
    if (res) {
      console.log("body successfully deleted");
    }
    return res;
  }

  const booleanFields = [
    "sublux",
    "muscleSpasm",
    "triggerPoints",
    "tenderness",
    "numbness",
    "edema",
    "swelling",
    "reducedMotion",
  ];

  booleanFields.forEach((field) => {
    if (body[field] === null) {
      body[field] = false;
    } else if (typeof body[field] === "string") {
      if (body[field].toLowerCase() === "x") {
        body[field] = true;
      } else if (body[field].toLowerCase() === "") {
        body[field] = false;
      }
    }
  });

  const response = await updateEntry(body.id, body);
  return response;
});
