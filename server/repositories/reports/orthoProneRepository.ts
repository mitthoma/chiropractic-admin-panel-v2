import prisma from '~~/prisma/client';

interface OrthoPronePayload {
  name: string;
  wnl?: string;
  lt?: string;
  rt?: string;
  referral?: string;
  reportId: string;
}

export const addOrthoProne = async (payload: OrthoPronePayload) => {
  try {
    const reportId = payload.reportId;

    const report = await prisma.report.findUnique({ where: { id: reportId } });
    if (!report) {
      throw new Error(`Report with id ${reportId} not found`);
    }
    const newOrthoProne = await prisma.orthoProne.create({
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

    return newOrthoProne;
  } catch (error) {
    return error;
  }
};

export const deleteOrthoProne = async (orthoProneId: string) => {
  try {
    await prisma.orthoProne.delete({ where: { id: orthoProneId } });
    return true;
  } catch (error) {
    return error;
  }
};

export const updateOrthoProne = async (
  orthoProneId: string,
  payload: Partial<OrthoPronePayload>
) => {
  try {
    const updatedOrthoProne = await prisma.orthoProne.update({
      where: { id: orthoProneId },
      data: payload,
    });
    return updatedOrthoProne;
  } catch (error) {
    return error;
  }
};

export const getOrthoProneById = async (id: string) => {
  try {
    const orthoProne = await prisma.orthoProne.findUnique({ where: { id } });
    if (!orthoProne) {
      throw new Error(`OrthoProne with id ${id} not found`);
    }
    return orthoProne;
  } catch (error) {
    return error;
  }
};

export const getAllOrthoPronesByReportId = async (reportId: string) => {
  try {
    const orthoPrones = await prisma.orthoProne.findMany({
      where: { reportId },
    });
    return orthoPrones;
  } catch (error) {
    return error;
  }
};
