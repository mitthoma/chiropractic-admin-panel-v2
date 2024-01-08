import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface OrthoSupinePayload {
  name: string;
  wnl?: string;
  lt?: string;
  rt?: string;
  referral?: string;
  reportId: string;
}

export const addOrthoSupine = async (payload: OrthoSupinePayload) => {
  try {
    const reportId = payload.reportId;

    const report = await prisma.report.findUnique({ where: { id: reportId } });
    if (!report) {
      throw new Error(`Report with id ${reportId} not found`);
    }
    const newOrthoSupine = await prisma.orthoSupine.create({
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

    return newOrthoSupine;
  } catch (error) {
    return error;
  }
};

export const deleteOrthoSupine = async (orthoSupineId: string) => {
  try {
    await prisma.orthoSupine.delete({ where: { id: orthoSupineId } });
    return true;
  } catch (error) {
    return error;
  }
};

export const updateOrthoSupine = async (
  orthoSupineId: string,
  payload: Partial<OrthoSupinePayload>
) => {
  try {
    const updatedOrthoSupine = await prisma.orthoSupine.update({
      where: { id: orthoSupineId },
      data: payload,
    });
    return updatedOrthoSupine;
  } catch (error) {
    return error;
  }
};

export const getOrthoSupineById = async (id: string) => {
  try {
    const orthoSupine = await prisma.orthoSupine.findUnique({ where: { id } });
    if (!orthoSupine) {
      throw new Error(`OrthoSupine with id ${id} not found`);
    }
    return orthoSupine;
  } catch (error) {
    return error;
  }
};

export const getAllOrthoSupinesByReportId = async (reportId: string) => {
  try {
    const orthoSupines = await prisma.orthoSupine.findMany({
      where: { reportId },
    });
    return orthoSupines;
  } catch (error) {
    return error;
  }
};
