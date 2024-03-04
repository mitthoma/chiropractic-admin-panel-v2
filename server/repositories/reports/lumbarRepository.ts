import prisma from '~~/prisma/client';

interface LumbarPayload {
  name: string;
  norm?: number;
  arom?: string;
  pain?: string;
  notes?: string;
  reportId: string;
}

export const addLumbar = async (payload: LumbarPayload) => {
  try {
    const reportId = payload.reportId;

    const report = await prisma.report.findUnique({ where: { id: reportId } });
    if (!report) {
      throw new Error(`Report with id ${reportId} not found`);
    }

    const newLumbar = await prisma.lumbar.create({
      data: {
        name: payload.name,
        norm: payload.norm,
        pain: payload.pain,
        arom: payload.arom,
        notes: payload.notes,
        report: {
          connect: {
            id: reportId,
          },
        },
      },
    });

    return newLumbar;
  } catch (error) {
    return error;
  }
};

export const deleteLumbar = async (lumbarId: string) => {
  try {
    await prisma.lumbar.delete({ where: { id: lumbarId } });
    return true;
  } catch (error) {
    return error;
  }
};

export const updateLumbar = async (
  lumbarId: string,
  payload: Partial<LumbarPayload>
) => {
  try {
    const updatedLumbar = await prisma.lumbar.update({
      where: { id: lumbarId },
      data: payload,
    });
    return updatedLumbar;
  } catch (error) {
    return error;
  }
};

export const getLumbarById = async (id: string) => {
  try {
    const lumbar = await prisma.lumbar.findUnique({ where: { id } });
    if (!lumbar) {
      throw new Error(`Lumbar with id ${id} not found`);
    }
    return lumbar;
  } catch (error) {
    return error;
  }
};

export const getAllLumbarsByReportId = async (reportId: string) => {
  try {
    const lumbars = await prisma.lumbar.findMany({ where: { reportId } });
    return lumbars;
  } catch (error) {
    return error;
  }
};
