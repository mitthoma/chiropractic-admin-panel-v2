import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const addTreatmentMethodName = async (name: string) => {
  try {
    const treatmentMethodName = await prisma.treatmentMethodName.create({
      data: { name },
    });
    return treatmentMethodName;
  } catch (error) {
    console.error('Failed to add treatment method name:', error);
    throw error;
  }
};

export const updateTreatmentMethodName = async (id: number, name: string) => {
  try {
    const treatmentMethodName = await prisma.treatmentMethodName.update({
      where: { id },
      data: { name },
    });
    return treatmentMethodName;
  } catch (error) {
    console.error('Failed to update treatment method name:', error);
    throw error;
  }
};

export const deleteTreatmentMethodName = async (id: number) => {
  try {
    await prisma.treatmentMethodName.delete({ where: { id } });
    return true;
  } catch (error) {
    console.error('Failed to delete treatment method name:', error);
    throw error;
  }
};

export const getTreatmentMethodNameById = async (id: number) => {
  try {
    const treatmentMethodName = await prisma.treatmentMethodName.findUnique({
      where: { id },
    });
    return treatmentMethodName;
  } catch (error) {
    console.error('Failed to retrieve treatment method name:', error);
    throw error;
  }
};

export const getAllTreatmentMethodNames = async () => {
  try {
    const treatmentMethodNames = await prisma.treatmentMethodName.findMany();
    return treatmentMethodNames;
  } catch (error) {
    console.error('Failed to retrieve all treatment method names:', error);
    throw error;
  }
};
