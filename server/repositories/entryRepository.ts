import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

export const addEntry = async (payload: any, noteId: string) => {
  try {
    // Fetch the note from the database
    const note = await prisma.note.findUnique({ where: { id: noteId } });

    if (!note) {
      throw new Error(`Note with id ${noteId} not found`);
    }

    // TODO:
    // Check if an identical entry already exists for this note
    // Note: Prisma does not support complex where clauses with relations yet as of my knowledge cutoff in September 2021
    // This would need to be done manually or with a raw SQL query

    // If no existing entry, create a new one and associate it with the note
    const newEntry = await prisma.entry.create({
      data: {
        ...payload,
        noteId: note.id
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