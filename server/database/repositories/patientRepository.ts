import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { Patient } from './schema'; // assuming you have your patient schema in ./schema.ts file

const connectionString = "your connection string here";
const client = postgres(connectionString);
const db: PostgresJsDatabase = drizzle(client);

// SaveNewPatient
export const saveNewPatient = async (
  payload: Partial<Patient>
): Promise<{ success: boolean; patient?: Patient; error?: string }> => {
  try {
    const existingPatient = await db.select().from(Patient).where(Patient.email.eq(payload.email)).one();
    if (existingPatient) {
      throw new Error('User with this email already exists');
    }

    const newPatient = await db.insert(Patient).values(payload).returning().one();
    return { success: true, patient: newPatient };
  } catch (error) {
    console.log(error);
    return { success: false, error: error.message };
  }
};

// UpdatePatient
export const updatePatient = async (id: number, payload: Partial<Patient>) => {
  try {
    const patient = await db.select().from(Patient).where(Patient.id.eq(id)).one();
    if (!patient) throw new Error('Patient not found');

    const updatedPatient = await db.update(Patient).set(payload).where(Patient.id.eq(id)).returning().one();
    return updatedPatient;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// DeletePatient
export const deletePatient = async (id: number) => {
  try {
    const result = await db.delete(Patient).where(Patient.id.eq(id)).execute();
    return result.affected;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// GetPatient
export const getPatient = async (id: number) => {
  try {
    const patient = await db.select().from(Patient).where(Patient.id.eq(id)).one();
    if (!patient) throw new Error('Patient not found');
    return patient;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// GetPatients
export const getPatients = async () => {
  try {
    const patients = await db.select().from(Patient).all();
    return patients;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//GetAllPatients
export const getAllPatients = async () => {
  try {
    const patients = await db.select().from(Patient).all();
    return patients;
  } catch (error) {
    console.log(error);
    return error;
  }
};