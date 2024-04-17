import { updateNote } from '~/server/repositories/noteRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const noteToPass = {
    temperature: body.temperature ? parseFloat(body.temperature) : null,
    respiration: body.respiration ? parseInt(body.respiration) : null,
    systolic: body.systolic ? parseInt(body.systolic) : null,
    diastolic: body.diastolic ? parseInt(body.diastolic) : null,
    physiotherapy: body.physiotherapy ? parseInt(body.physiotherapy) : null,
    physio: body.physio ? parseInt(body.physio) : null,
    tx: body.tx ? parseInt(body.tx) : null,
    patientId: body.patientId ? parseInt(body.patientId) : null,
    pulse: body.pulse ? parseInt(body.pulse) : null,
    visitDate: body.visitDate ? body.visitDate : null,
    doctorNote: body.doctorNote ? body.doctorNote : null,
  };

  const response = await updateNote(body.id, noteToPass);
  return response;
});
