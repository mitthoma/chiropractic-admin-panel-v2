import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

export const addEntry = async (payload: any, noteId: string) => {
  try {
    console.log("in add entry, note id is ", noteId);
    console.log ("in add entry, payload is ", payload);

    // First, validate if the noteId is present in the database.
    const note = await prisma.note.findUnique({ where: { id: noteId } });

    if (!note) {
      throw new Error(`Note with id ${noteId} not found`);
    }

    console.log('ABOUT TO SAVE PAYLOAD AND PAYLOAD IS ', payload);
    const newEntry = await prisma.entry.create({
      data: {
        ...payload,
        note: {
          connect: { id: noteId } // Use noteId field to connect with the note
        }
      }
    });

    return newEntry;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteEntry = async (entryId: string) => {
  try {
    const result = await prisma.entry.delete({ where: { id: entryId } });
    return true;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const updateEntry = async (entryId: string, payload: Partial<any>) => {
  try {
    const updatedEntry = await prisma.entry.update({
      where: { id: entryId },
      data: payload
    });
    return updatedEntry;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getAllEntriesByNoteId = async (noteId: string) => {
  try {
    const entries = await prisma.entry.findMany({ where: { noteId } });
    return entries;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getEntryById = async (id: string) => {
  try {
    console.log('get entry by not')
    const entry = await prisma.entry.findUnique({ where: { id } });
    if (!entry) {
      throw new Error(`Entry with id ${id} not found`);
    }
    return entry;
  } catch (error) {
    console.log(error);
    return error;
  }
};