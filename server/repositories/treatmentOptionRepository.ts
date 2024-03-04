import { Prisma, treatmentOption } from '@prisma/client';
import prisma from '~~/prisma/client';

export const saveNewOption = async (
  payload: Prisma.treatmentOptionCreateInput
): Promise<{
  success: boolean;
  treatmentOption?: treatmentOption;
  error?: string;
}> => {
  try {
    const existingOption = await prisma.treatmentOption.findFirst({
      where: { text: payload.text, category: payload.category },
    });
    if (existingOption) {
      throw new Error('Option already exists');
    }

    const savedOption = await prisma.treatmentOption.create({ data: payload });
    return { success: true, treatmentOption: savedOption };
  } catch (error: any) {
    console.error(error);
    return { success: false, error: error.message };
  }
};

export const updateOption = async (
  id: number,
  payload: Prisma.treatmentOptionUpdateInput
): Promise<treatmentOption | null> => {
  try {
    const updatedOption = await prisma.treatmentOption.update({
      where: { id },
      data: payload,
    });
    return updatedOption;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteOption = async (id: number): Promise<boolean> => {
  try {
    const result = await prisma.treatmentOption.delete({ where: { id } });
    return !!result;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getTreatmentOption = async (
  id: number
): Promise<treatmentOption | null> => {
  try {
    const treatmentOption = await prisma.treatmentOption.findUnique({
      where: { id },
    });
    return treatmentOption;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getAllTreatmentOptions = async (): Promise<treatmentOption[]> => {
  try {
    const to = await prisma.treatmentOption.findMany();
    return to;
  } catch (error) {
    console.error(error);
    return [];
  }
};
