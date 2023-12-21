import {
  PrismaClient,
  Prisma,
  entry_spinallevel_enum,
  entry_category_enum,
  entry_region_enum,
  entry_extremitylevel_enum,
  entry_side_enum,
} from "@prisma/client";

const prisma = new PrismaClient();

interface EntryPayload {
  createdDate?: Date; // Optional because Prisma provides a default value
  category: entry_category_enum;
  region?: entry_region_enum; // Optional because it's optional in the schema
  spinalLevel?: entry_spinallevel_enum; // Optional because it's optional in the schema
  extremityLevel?: entry_extremitylevel_enum; // Optional because it's optional in the schema
  side: entry_side_enum;
  sublux: boolean;
  muscleSpasm: boolean;
  triggerPoints: boolean;
  tenderness: boolean;
  numbness: boolean;
  edema: boolean;
  swelling: boolean;
  reducedMotion: boolean;
  coldPack: boolean;
  hotPack: boolean;
  electStim: boolean;
  traction: boolean;
  massage: boolean;
  technique?: string;
  manipulation: boolean;
  note?: string; // Optional because it's optional in the schema
  physioPositioning?: string;
  treatmentPositioning?: string;
}

export const addEntry = async (payload: EntryPayload) => {
  try {
    // const defaultPayload = {
    //   createdDate: new Date(),
    //   category: "spinal", // Replace with a valid default category
    //   region: null,
    //   spinalLevel: null,
    //   extremityLevel: null,
    //   side: "l", // Replace with a valid default side
    //   sublux: false,
    //   muscleSpasm: false,
    //   triggerPoints: false,
    //   tenderness: false,
    //   numbness: false,
    //   edema: false,
    //   swelling: false,
    //   reducedMotion: false,
    //   coldPack: false,
    //   hotPack: false,
    //   electStim: false,
    //   traction: false,
    //   massage: false,
    //   manipulation: false,
    // };

    // const completePayload = {
    //   ...defaultPayload,
    //   ...payload,
    //   physioPositioning: null,
    //   treatmentPositioning: null,
    //   technique: null,

    // };

    console.log('payload is ', payload);
    const noteId = payload.note;



    const note = await prisma.note.findUnique({ where: { id: noteId } });
    if (!note) {
      throw new Error(`Note with id ${noteId} not found`);
    }

    const newEntry = await prisma.entry.create({
      data: {
        ...payload,
        note: {
          connect: {
            id: noteId,
          },
        },
      },
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

export const updateEntry = async (payload: Partial<any>) => {
  try {
    const entryId = payload.id;
    const updatedEntry = await prisma.entry.update({
      where: { id: entryId },
      data: payload,
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
