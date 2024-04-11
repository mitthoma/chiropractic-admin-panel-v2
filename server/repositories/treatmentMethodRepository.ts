import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const addTreatmentMethod = async (
  payload: Prisma.TreatmentMethodCreateInput
) => {
  try {
    const treatmentMethod = await prisma.treatmentMethod.create({
      data: payload,
    });
    return treatmentMethod;
  } catch (error) {
    console.error('Failed to add treatment method:', error);
    throw error;
  }
};

export const findAllByTreatmentId = async (treatmentId: string) => {
  try {
    const treatmentMethods = await prisma.treatmentMethod.findMany({
      where: { treatmentId },
      include: { treatmentMethodName: true },
    });
    return treatmentMethods;
  } catch (error) {
    console.error('Failed to find treatment methods by treatment ID:', error);
    throw error;
  }
};

export const updateTreatmentMethod = async (
  id: string,
  payload: Prisma.TreatmentMethodUpdateInput
) => {
  try {
    const treatmentMethod = await prisma.treatmentMethod.update({
      where: { id },
      data: payload,
    });
    return treatmentMethod;
  } catch (error) {
    console.error('Failed to update treatment method:', error);
    throw error;
  }
};

export const deleteTreatmentMethod = async (id: string) => {
  try {
    await prisma.treatmentMethod.delete({ where: { id } });
    return true;
  } catch (error) {
    console.error('Failed to delete treatment method:', error);
    throw error;
  }
};

export const getTreatmentMethodsById = async (treatmentId: string) => {
  try {
    const treatmentMethods = await prisma.treatmentMethod.findMany({
      where: { treatmentId },
      include: {
        treatmentMethodName: true,
      },
    });
    return treatmentMethods;
  } catch (error) {
    console.error(
      'Failed to retrieve treatment methods by treatment ID:',
      error
    );
    throw error;
  }
};
