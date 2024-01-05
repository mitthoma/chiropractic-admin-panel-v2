import { getAllTreatmentsByNoteId } from '~/server/repositories/treatmentRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const res = await getAllTreatmentsByNoteId(body.noteId);
  return {
    data: res,
  };
});
