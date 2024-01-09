import { updateReport } from '~~/server/repositories/reports/reportRepository';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const cleanedBody = {
    sys: body.sys ? parseInt(body.sys) : null,
    dia: body.dia ? parseInt(body.dia) : null,
    pulse: body.pulse ? parseInt(body.pulse) : null,
    temp: body.temp ? parseFloat(body.temp) : null,
    resp: body.resp ? parseInt(body.resp) : null,
    id: body.id,
    exam_date: body.exam_date,
    speech: body.speech,
    gait: body.gait,
    rhomberg: body.rhomberg,
    demeanor: body.demeanor,
    patientId: body.patientId,
  };
  const response = await updateReport(body.id, cleanedBody);
  return response;
});
