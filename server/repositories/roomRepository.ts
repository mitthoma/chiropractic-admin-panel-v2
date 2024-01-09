import { PrismaClient, Prisma, room } from '@prisma/client';
const prisma = new PrismaClient();

export const saveNewRoom = async (
  payload: Prisma.roomCreateInput
): Promise<{ success: boolean; room?: room; error?: string }> => {
  try {
    const existingRoom = await prisma.room.findFirst({
      where: { text: payload.text },
    });
    if (existingRoom) {
      throw new Error('Room already exists');
    }

    const savedRoom = await prisma.room.create({ data: payload });
    return { success: true, room: savedRoom };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const updateRoom = async (
  id: number,
  payload: Prisma.roomUpdateInput
): Promise<room | null> => {
  try {
    const updatedRoom = await prisma.room.update({
      where: { id },
      data: payload,
    });
    return updatedRoom;
  } catch (error) {
    return null;
  }
};

export const deleteRoom = async (id: number): Promise<boolean> => {
  try {
    const result = await prisma.room.delete({ where: { id } });
    return !!result;
  } catch (error) {
    return false;
  }
};

export const getRoom = async (id: number): Promise<room | null> => {
  try {
    const room = await prisma.room.findUnique({ where: { id } });
    return room;
  } catch (error) {
    return null;
  }
};

export const getAllRooms = async (): Promise<room[]> => {
  try {
    const rooms = await prisma.room.findMany();
    return rooms;
  } catch (error) {
    return [];
  }
};
