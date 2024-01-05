import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface OrthoStandingPayload {
  name: string;
  wnl?: number;
  lt?: string;
  rt?: string;
  pain?: string;
  reportId: string;
}

export const addOrthoStanding = async (payload: OrthoStandingPayload) => {
  try {
    const newOrthoStanding = await prisma.orthoStanding.create({
      data: {
        ...payload,
        report: {
          connect: {
            id: payload.reportId,
          },
        },
      },
    });

    return newOrthoStanding;
  } catch (error) {
    return error;
  }
};

export const deleteOrthoStanding = async (orthoStandingId: string) => {
  try {
    await prisma.orthoStanding.delete({ where: { id: orthoStandingId } });
    return true;
  } catch (error) {
    return error;
  }
};

export const updateOrthoStanding = async (
  orthoStandingId: string,
  payload: Partial<OrthoStandingPayload>
) => {
  try {
    const updatedOrthoStanding = await prisma.orthoStanding.update({
      where: { id: orthoStandingId },
      data: payload,
    });
    return updatedOrthoStanding;
  } catch (error) {
    return error;
  }
};

export const getOrthoStandingById = async (id: string) => {
  try {
    const orthoStanding = await prisma.orthoStanding.findUnique({
      where: { id },
    });
    if (!orthoStanding) {
      throw new Error(`OrthoStanding with id ${id} not found`);
    }
    return orthoStanding;
  } catch (error) {
    return error;
  }
};

export const getAllOrthoStandingsByReportId = async (reportId: string) => {
  try {
    const orthoStandings = await prisma.orthoStanding.findMany({
      where: { reportId },
    });
    return orthoStandings;
  } catch (error) {
    return error;
  }
};
