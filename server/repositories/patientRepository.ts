
import { PrismaClient, Prisma, Patient } from '@prisma/client';
console.log('Prisma client created');
const prisma = new PrismaClient();


// export const saveNewPatient = async (
//   payload: Prisma.PatientCreateInput
// ): Promise<{ success: boolean; patient?: Patient; error?: string }> => {
//   try {
//     const existingPatient = await prisma.patient.findFirst({ where: { email: payload.email } });
//     if (existingPatient) {
//       throw new Error('User with this email already exists');
//     }

//     const savedPatient = await prisma.patient.create({ data: payload });
//     return { success: true, patient: savedPatient };
//   } catch (error: any) {
//     console.error(error);
//     return { success: false, error: error.message };
//   }
// };

// export const updatePatient = async (
//   id: number,
//   payload: Prisma.PatientUpdateInput
// ): Promise<Patient | null> => {
//   try {
//     const updatedPatient = await prisma.patient.update({
//       where: { id },
//       data: payload,
//     });
//     return updatedPatient;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// };

// export const deletePatient = async (id: number): Promise<boolean> => {
//   try {
//     const result = await prisma.patient.delete({ where: { id } });
//     return !!result;
//   } catch (error) {
//     console.error(error);
//     return false;
//   }
// };

// export const getPatient = async (id: number): Promise<Patient | null> => {
//   try {
//     const patient = await prisma.patient.findUnique({ where: { id } });
//     return patient;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// };

// export const getPatients = async (
//   params: Prisma.PatientFindManyArgs
// ): Promise<Patient[]> => {
//     console.log('entering getpatients');
//   try {
//     console.log('entering getpatients');
//     console.log('prisma is ', prisma);
//     const patients = await prisma.patient.findMany(params);
//     return patients;
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// };

export const getAllPatients = async (): Promise<Patient[]> => {
    console.log('entering getpatients');
    // console.log("PRISMA CLIENT IS ", prisma);
  try {

    console.log('getAllPatients');
    // console.log("PRISMA CLIENT IS ", prisma);

    const patients = await prisma.patient.findMany();
    return patients;
    // return [] as Patient[];
  } catch (error) {
    console.error(error);
    return [];
  }
};