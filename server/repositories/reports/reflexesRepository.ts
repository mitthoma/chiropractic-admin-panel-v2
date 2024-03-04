import prisma from '~~/prisma/client';

interface ReflexesPayload {
  name: string;
  level?: string;
  wnl?: string;
  lt?: string;
  rt?: string;
  notes?: string;
  reportId: string;
}

export const addReflexes = async (payload: ReflexesPayload) => {
  try {
    const reportId = payload.reportId;

    const report = await prisma.report.findUnique({ where: { id: reportId } });
    if (!report) {
      throw new Error(`Report with id ${reportId} not found`);
    }
    const newReflexes = await prisma.reflexes.create({
      data: {
        name: payload.name,
        level: payload.level,
        wnl: payload.wnl,
        lt: payload.lt,
        rt: payload.rt,
        notes: payload.notes,
        report: {
          connect: {
            id: reportId,
          },
        },
      },
    });

    return newReflexes;
  } catch (error) {
    return error;
  }
};

export const deleteReflexes = async (reflexesId: string) => {
  try {
    await prisma.reflexes.delete({ where: { id: reflexesId } });
    return true;
  } catch (error) {
    return error;
  }
};

export const updateReflexes = async (
  reflexesId: string,
  payload: Partial<ReflexesPayload>
) => {
  try {
    const updatedReflexes = await prisma.reflexes.update({
      where: { id: reflexesId },
      data: payload,
    });
    return updatedReflexes;
  } catch (error) {
    return error;
  }
};

export const getReflexesById = async (id: string) => {
  try {
    const reflexes = await prisma.reflexes.findUnique({ where: { id } });
    if (!reflexes) {
      throw new Error(`Reflexes with id ${id} not found`);
    }
    return reflexes;
  } catch (error) {
    return error;
  }
};

export const getAllReflexessByReportId = async (reportId: string) => {
  try {
    const reflexess = await prisma.reflexes.findMany({ where: { reportId } });
    return reflexess;
  } catch (error) {
    return error;
  }
};
