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
    // First, check if the treatment method exists
    const existingMethod = await prisma.treatmentMethod.findUnique({
      where: { id },
    });

    // If the method exists, proceed with deletion
    if (existingMethod) {
      await prisma.treatmentMethod.delete({
        where: { id },
      });
      console.log('Treatment method deleted successfully.');
      return true; // Indicate successful deletion
    } else {
      console.log('Treatment method not found, no action taken.');
      return false; // Indicate no deletion took place
    }
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
