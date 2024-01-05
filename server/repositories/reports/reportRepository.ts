import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// patient must exist for a report to be added so we don't need to add new patients here
export const addNewReport = async (payload: any, patientId: number) => {
  try {
    const patientsRepository = prisma.patient;

    // Fetch the patient from the database
    const patient = await patientsRepository.findUnique({
      where: { id: patientId as number },
    });

    if (!patient) {
      throw new Error(`Patient with id ${patientId} not found`);
    }
    const newReport = await prisma.report.create({
      data: {
        ...payload,
        patientId: patient.id as number,
      },
    });

    return newReport;
  } catch (error) {
    return error;
  }
};

export const getAllReports = async () => {
  try {
    const reports = await prisma.report.findMany({
      include: { patient: true }, // this brings in the patient data with each report
    });

    return reports;
  } catch (error) {
    return error;
  }
};

export const updateReport = async (reportId: string, payload: Partial<any>) => {
  try {
    const updatedReport = await prisma.report.update({
      where: { id: reportId },
      data: payload,
    });

    return updatedReport;
  } catch (error) {
    return error;
  }
};

export const deleteReport = async (reportId: any) => {
  try {
    // Fetch all relationships to this report
    // const [entities] = await prisma.[enter entity].findMany({
    //   where: { reportId },
    // });

    // Delete all records in each entity related to the report
    // if ([records of entity]) {
    //   for (const record of [entity]) {
    // delete the record
    //   }
    // }

    // Delete the report
    await prisma.report.delete({ where: { id: reportId } });
    return true;
  } catch (error) {
    return error;
  }
};

export const getReportsByPatientId = async (patientId: number) => {
  try {
    const reports = await prisma.report.findMany({ where: { patientId } });
    return reports;
  } catch (error) {
    return error;
  }
};

export const getReportById = async (reportId: string) => {
  try {
    const report = await prisma.report.findUnique({
      where: { id: reportId },
      include: { patient: true },
    });

    if (!report) {
      throw new Error(`Report with id ${reportId} not found`);
    }

    return report;
  } catch (error) {
    return error;
  }
};
