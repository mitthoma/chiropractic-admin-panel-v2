import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

export const addNewComplaint = async (payload: any, noteId: string) => {
  try {
    const notesRepository = prisma.note;

    // Fetch the patient from the database
    const note = await notesRepository.findUnique({ where: { id: noteId } });

    if (!note) {
      throw new Error(`Patient with id ${noteId} not found`);
    }


    const newComplaint = await prisma.complaint.create({
      data: {
        ...payload,
        noteId: note.id
      },
    });

    return newComplaint;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getAllComplaints = async () => {
  try {
    const complaints = await prisma.complaint.findMany();

    return complaints;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const updateComplaint = async (complaintId: string, payload: Partial<any>) => {
  try {
    const updatedComplaint = await prisma.complaint.update({
      where: { id: complaintId },
      data: payload
    });

    return updatedComplaint;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteComplaint = async (complaintId: string) => {
  try {
    const result = await prisma.complaint.delete({ where: { id: complaintId } });
    return true;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// TODO: 
export const getComplaintsByPatientId = async (patientId: number) => {
  try {
    // const complaints = await prisma.complaint.findMany({ where: { patientId } });
    // return complaints;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getComplaintById = async (complaintId: string) => {
  try {
    console.log('ADD COMPLAINT, COMPLAINT ID IS ', complaintId);

    const complaint = await prisma.complaint.findUnique({
      where: { id: complaintId },
    });

    if (!complaint) {
      throw new Error(`Complaint with id ${complaintId} not found`);
    }

    return complaint;
  } catch (error) {
    console.log(error);
    return error;
  }
};