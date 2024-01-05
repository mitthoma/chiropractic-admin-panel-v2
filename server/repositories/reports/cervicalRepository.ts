import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface CervicalPayload {
  name: string;
  norm?: number;
  arom?: string;
  pain?: string;
  notes?: string;
  reportId: string;
}

export const addCervical = async (payload: CervicalPayload) => {
  try {
    const newCervical = await prisma.cervical.create({
      data: {
        ...payload,
        report: {
          connect: {
            id: payload.reportId,
          },
        },
      },
    });

    return newCervical;
  } catch (error) {
    return error;
  }
};

export const deleteCervical = async (cervicalId: string) => {
  try {
    await prisma.cervical.delete({ where: { id: cervicalId } });
    return true;
  } catch (error) {
    return error;
  }
};

export const updateCervical = async (
  cervicalId: string,
  payload: Partial<CervicalPayload>
) => {
  try {
    const updatedCervical = await prisma.cervical.update({
      where: { id: cervicalId },
      data: payload,
    });
    return updatedCervical;
  } catch (error) {
    return error;
  }
};

export const getCervicalById = async (id: string) => {
  try {
    const cervical = await prisma.cervical.findUnique({ where: { id } });
    if (!cervical) {
      throw new Error(`Cervical with id ${id} not found`);
    }
    return cervical;
  } catch (error) {
    return error;
  }
};

export const getAllCervicalsByReportId = async (reportId: string) => {
  try {
    const cervicals = await prisma.cervical.findMany({ where: { reportId } });
    return cervicals;
  } catch (error) {
    return error;
  }
};
