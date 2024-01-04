import { PrismaClient, Prisma, patient } from '@prisma/client';
import { deleteNote } from './noteRepository';
import { deleteComplaint } from './complaintRepository';
const prisma = new PrismaClient();

export const saveNewPatient = async (
  payload: Prisma.patientCreateInput
): Promise<{ success: boolean; patient?: patient; error?: string }> => {
  try {
    const existingPatient = await prisma.patient.findFirst({
      where: { email: payload.email },
    });
    if (existingPatient) {
      throw new Error('User with this email already exists');
    }

    const savedPatient = await prisma.patient.create({ data: payload });
    return { success: true, patient: savedPatient };
  } catch (error: any) {
    console.error(error);
    return { success: false, error: error.message };
  }
};

export const updatePatient = async (
  id: number,
  payload: Prisma.patientUpdateInput
): Promise<patient | null> => {
  try {
    const updatedPatient = await prisma.patient.update({
      where: { id },
      data: payload,
    });
    return updatedPatient;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deletePatient = async (id: number): Promise<boolean> => {
  try {
    // Fetch all complaints related to the patient
    const complaints = await prisma.complaint.findMany({
      where: { patientId: id },
    });

    // Delete all complaints related to the patient
    if (complaints) {
      for (const complaint of complaints) {
        await deleteComplaint(complaint.id);
      }
    }
    // Fetch all notes related to the patient
    const notes = await prisma.note.findMany({
      where: { patientId: id },
    });

    // Delete all notes related to the patient
    if (notes) {
      for (const note of notes) {
        await deleteNote(note.id);
      }
    }

    const result = await prisma.patient.delete({ where: { id } });
    return !!result;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getPatient = async (id: number): Promise<patient | null> => {
  try {
    const patient = await prisma.patient.findUnique({ where: { id } });
    return patient;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getPatients = async (
  params: Prisma.patientFindManyArgs
): Promise<patient[]> => {
  try {
    const patients = await prisma.patient.findMany(params);
    return patients;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getAllPatients = async (): Promise<patient[]> => {
  try {
    const patients = await prisma.patient.findMany();
    return patients;
    // return [] as Patient[];
  } catch (error) {
    console.error(error);
    return [];
  }
};
