import { Prisma } from '@prisma/client';
import prisma from '~~/prisma/client';

export const getAllUsers = async () => {
  try {
    const results = await prisma.user.findMany();
    return results;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const saveNewUser = async (
  payload: Prisma.userCreateInput
): Promise<Prisma.PromiseReturnType<typeof prisma.user.create>> => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { firebaseUid: payload.firebaseUid },
    });

    if (existingUser) {
      throw new Error('User with this Firebase UID already exists');
    }

    const newUser = await prisma.user.create({
      data: payload,
    });

    return newUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateUser = async (
  id: number,
  payload: Prisma.userUpdateInput
): Promise<Prisma.PromiseReturnType<typeof prisma.user.update>> => {
  try {
    const existingUser = await prisma.user.findUnique({ where: { id } });

    if (!existingUser) {
      throw new Error('User not found');
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: payload,
    });

    return updatedUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteUser = async (id: number): Promise<boolean> => {
  try {
    await prisma.user.delete({ where: { id } });
    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUser = async (
  id: number
): Promise<Prisma.PromiseReturnType<typeof prisma.user.findUnique>> => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserByFirebaseUid = async (
  firebaseUid: string
): Promise<Prisma.PromiseReturnType<typeof prisma.user.findUnique>> => {
  try {
    if (!firebaseUid) {
      throw new Error('Invalid firebaseUid');
    }

    const user = await prisma.user.findUnique({ where: { firebaseUid } });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
