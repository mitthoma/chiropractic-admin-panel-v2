import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const addTreatment = async (payload) => {
  try {
    // Assuming payload.note is the UUID of the existing note you want to link
    const noteId = payload.note;
    delete payload.note; // Remove note field from payload to prevent errors

    console.log('PAYLOAD ON TREATMENT ADD IS ', payload);
    const newTreatment = await prisma.treatment.create({
      data: {
        ...payload,
        note: {
          connect: {
            id: noteId, // Connect the existing note using its ID
          },
        },
      },
    });
    console.log('new treatment ', newTreatment);
    return newTreatment;
  } catch (error) {
    console.error('Failed to add treatment:', error);
    throw error;
  }
};

export const updateTreatment = async (
  id: string,
  payload: Prisma.TreatmentUpdateInput
) => {
  try {
    const updatedTreatment = await prisma.treatment.update({
      where: { id },
      data: payload,
    });
    return updatedTreatment;
  } catch (error) {
    console.error('Failed to update treatment:', error);
    throw error;
  }
};

export const deleteTreatment = async (id: string) => {
  try {
    await prisma.treatment.delete({ where: { id } });
    return true;
  } catch (error) {
    console.error('Failed to delete treatment:', error);
    throw error;
  }
};

export const getTreatmentById = async (id: string) => {
  try {
    const treatment = await prisma.treatment.findUnique({
      where: { id },
      include: { treatmentMethod: true },
    });
    return treatment;
  } catch (error) {
    console.error('Failed to retrieve treatment:', error);
    throw error;
  }
};

export const getTreatmentMethodsForTreatment = async (treatmentId: string) => {
  try {
    const treatmentMethods = await prisma.treatmentMethod.findMany({
      where: { treatmentId },
      include: { treatmentMethodName: true },
    });
    return treatmentMethods;
  } catch (error) {
    console.error('Failed to retrieve treatment methods for treatment:', error);
    throw error;
  }
};

export const getAllTreatmentsByNoteId = async (noteId: string) => {
  try {
    const treatments = await prisma.treatment.findMany({
      where: { noteId },
    });
    return treatments;
  } catch (error) {
    console.log(error);
    return error;
  }
};
