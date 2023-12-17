import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { deleteComplaint } from "./complaintRepository";
import { deleteEntry } from "./entryRepository";

//patient must exist for a note to be added so we don't need to add new patients here
export const addNewNote = async (payload: any, patientId: number) => {
  try {
    const patientsRepository = prisma.patient;

    // Fetch the patient from the database
    const patient = await patientsRepository.findUnique({
      where: { id: patientId as number },
    });

    if (!patient) {
      throw new Error(`Patient with id ${patientId} not found`);
    }
    const newNote = await prisma.note.create({
      data: {
        ...payload,
        patientId: patient.id as number,
      },
    });

    return newNote;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getAllNotes = async () => {
  try {
    const notes = await prisma.note.findMany({
      include: { patient: true }, // Include the related Patient entity
    });

    return notes;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const updateNote = async (noteId: string, payload: Partial<any>) => {
  try {
    const updatedNote = await prisma.note.update({
      where: { id: noteId },
      data: payload,
    });

    return updatedNote;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteNote = async (noteId: any) => {
  try {
    // Fetch all entries related to the note
    const entries = await prisma.entry.findMany({
      where: { noteId: noteId },
    });

    // Delete all entries related to the note
    if (entries) {
      for (const entry of entries) {
        await deleteEntry(entry.id);
      }
    }

    // Delete the note
    const result = await prisma.note.delete({ where: { id: noteId } });
    return true;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getNotesByPatientId = async (patientId: number) => {
  try {
    const notes = await prisma.note.findMany({ where: { patientId } });
    return notes;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getNoteById = async (noteId: string) => {
  try {
    console.log('noteid is ', noteId)
    const note = await prisma.note.findUnique({
      where: { id: noteId },
      include: { patient: true }, // Include the related Patient entity
    });

    if (!note) {
      throw new Error(`Note with id ${noteId} not found`);
    }

    return note;
  } catch (error) {
    console.log(error);
    return error;
  }
};
