import prisma from '~~/prisma/client';

interface OrthoSeatedPayload {
  name: string;
  wnl?: string;
  lt?: string;
  rt?: string;
  referral?: string;
  reportId: string;
}

export const addOrthoSeated = async (payload: OrthoSeatedPayload) => {
  try {
    const reportId = payload.reportId;

    const report = await prisma.report.findUnique({ where: { id: reportId } });
    if (!report) {
      throw new Error(`Report with id ${reportId} not found`);
    }

    const newOrthoSeated = await prisma.orthoSeated.create({
      data: {
        name: payload.name,
        wnl: payload.wnl,
        lt: payload.lt,
        rt: payload.rt,
        referral: payload.referral,
        report: {
          connect: {
            id: reportId,
          },
        },
      },
    });

    return newOrthoSeated;
  } catch (error) {
    return error;
  }
};

export const deleteOrthoSeated = async (orthoSeatedId: string) => {
  try {
    await prisma.orthoSeated.delete({ where: { id: orthoSeatedId } });
    return true;
  } catch (error) {
    return error;
  }
};

export const updateOrthoSeated = async (
  orthoSeatedId: string,
  payload: Partial<OrthoSeatedPayload>
) => {
  try {
    const updatedOrthoSeated = await prisma.orthoSeated.update({
      where: { id: orthoSeatedId },
      data: payload,
    });
    return updatedOrthoSeated;
  } catch (error) {
    return error;
  }
};

export const getOrthoSeatedById = async (id: string) => {
  try {
    const orthoSeated = await prisma.orthoSeated.findUnique({ where: { id } });
    if (!orthoSeated) {
      throw new Error(`OrthoSeated with id ${id} not found`);
    }
    return orthoSeated;
  } catch (error) {
    return error;
  }
};

export const getAllOrthoSeatedsByReportId = async (reportId: string) => {
  try {
    const orthoSeateds = await prisma.orthoSeated.findMany({
      where: { reportId },
    });
    return orthoSeateds;
  } catch (error) {
    return error;
  }
};
