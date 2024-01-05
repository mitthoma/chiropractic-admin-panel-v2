import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface OrthoSeatedPayload {
  name: string;
  wnl?: number;
  lt?: string;
  rt?: string;
  referral?: string;
  reportId: string;
}

export const addOrthoSeated = async (payload: OrthoSeatedPayload) => {
  try {
    const newOrthoSeated = await prisma.orthoSeated.create({
      data: {
        ...payload,
        report: {
          connect: {
            id: payload.reportId,
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
