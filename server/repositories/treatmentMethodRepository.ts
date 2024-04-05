import { Prisma, treatmentMethod } from '@prisma/client';
import prisma from '~~/prisma/client';

export const saveNewMethod = async (
  payload: Prisma.treatmentMethodCreateInput
): Promise<{
  success: boolean;
  treatmentMethod?: treatmentMethod;
  error?: string;
}> => {
  try {
    const existingMethod = await prisma.treatmentMethod.findFirst({
      where: { text: payload.text, category: payload.category },
    });
    if (existingMethod) {
      throw new Error('Method already exists');
    }

    const savedMethod = await prisma.treatmentMethod.create({ data: payload });
    return { success: true, treatmentMethod: savedMethod };
  } catch (error: any) {
    console.error(error);
    return { success: false, error: error.message };
  }
};

export const updateMethod = async (
  id: number,
  payload: Prisma.treatmentMethodUpdateInput
): Promise<treatmentMethod | null> => {
  try {
    const updatedMethod = await prisma.treatmentMethod.update({
      where: { id },
      data: payload,
    });
    return updatedMethod;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteMethod = async (id: number): Promise<boolean> => {
  try {
    const result = await prisma.treatmentMethod.delete({ where: { id } });
    return !!result;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getTreatmentMethod = async (
  id: number
): Promise<treatmentMethod | null> => {
  try {
    const treatmentMethod = await prisma.treatmentMethod.findUnique({
      where: { id },
    });
    return treatmentMethod;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getAllTreatmentMethods = async (): Promise<treatmentMethod[]> => {
  try {
    const to = await prisma.treatmentMethod.findMany();
    return to;
  } catch (error) {
    console.error(error);
    return [];
  }
};
