/* eslint-disable camelcase */
import {
  PrismaClient,
  entry_category_enum,
  entry_region_enum,
  entry_extremitylevel_enum,
  entry_side_enum,
  entry_spinallevel_enum,
} from '@prisma/client';

const prisma = new PrismaClient();

interface TreatmentPayload {
  id: string;
  category: entry_category_enum;
  region?: entry_region_enum;
  spinalLevel?: entry_spinallevel_enum;
  extremityLevel?: entry_extremitylevel_enum;
  side: entry_side_enum;

  physioPositioning?: string;
  treatmentPositioning?: string;
  treatmentTechnique?: string;

  coldPack?: boolean;
  hotPack?: boolean;
  electStim?: boolean;
  traction?: boolean;
  massage?: boolean;
  treatmentManipulation?: boolean;
  noteId: string;
}

export const addTreatment = async (payload: TreatmentPayload) => {
  try {
    const newTreatment = await prisma.treatment.create({
      data: payload,
    });
    return newTreatment;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteTreatment = async (treatmentId: string) => {
  try {
    await prisma.treatment.delete({
      where: { id: treatmentId },
    });
    return true;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const updateTreatment = async (payload: TreatmentPayload) => {
  try {
    const treatmentId = payload.id;
    const updatedTreatment = await prisma.treatment.update({
      where: { id: treatmentId },
      data: payload,
    });
    return updatedTreatment;
  } catch (error) {
    console.log(error);
    return error;
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

export const getTreatmentById = async (id: string) => {
  try {
    const treatment = await prisma.treatment.findUnique({
      where: { id },
    });
    if (!treatment) {
      throw new Error(`Treatment with id ${id} not found`);
    }
    return treatment;
  } catch (error) {
    console.log(error);
    return error;
  }
};
