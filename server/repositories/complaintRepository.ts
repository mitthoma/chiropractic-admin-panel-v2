import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

export const addNewComplaint = async (payload: any, patientId: number) => {
  try {
    const patientsRepository = prisma.patient;

    // Fetch the patient from the database
    const patient = await patientsRepository.findUnique({ where: { id: patientId } });

    if (!patient) {
      throw new Error(`Patient with id ${patientId} not found`);
    }


    const newComplaint = await prisma.complaint.create({
      data: {
        ...payload,
        patientId: patient?.id
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
    const complaint = await prisma.complaint.findUnique({ where: { id: complaintId } });
    if (!complaint) {
      throw new Error(`Complaint with id ${complaintId} not found`);
    }

    const updatedComplaint = await prisma.complaint.update({
      where: { id: complaintId },
      data: payload // Here, we're using payload directly instead of payload.complaint
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

export const getComplaintsByPatientId = async (patientId: number) => {
  try {
    const complaints = await prisma.complaint.findMany({ where: { patientId } });
    return complaints;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getComplaintById = async (complaintId: string) => {
  try {

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