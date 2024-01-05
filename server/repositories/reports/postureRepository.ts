import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface PosturePayload {
  name: string;
  wnl?: number;
  tiltName?: string;
  tiltEst?: string;
  translationName?: string;
  translationEst?: string;
  rotation?: string;
  lordKyph?: string;
  reportId: string;
}

export const addPosture = async (payload: PosturePayload) => {
  try {
    const newPosture = await prisma.posture.create({
      data: {
        ...payload,
        report: {
          connect: {
            id: payload.reportId,
          },
        },
      },
    });

    return newPosture;
  } catch (error) {
    return error;
  }
};

export const deletePosture = async (postureId: string) => {
  try {
    await prisma.posture.delete({ where: { id: postureId } });
    return true;
  } catch (error) {
    return error;
  }
};

export const updatePosture = async (
  postureId: string,
  payload: Partial<PosturePayload>
) => {
  try {
    const updatedPosture = await prisma.posture.update({
      where: { id: postureId },
      data: payload,
    });
    return updatedPosture;
  } catch (error) {
    return error;
  }
};

export const getPostureById = async (id: string) => {
  try {
    const posture = await prisma.posture.findUnique({ where: { id } });
    if (!posture) {
      throw new Error(`Posture with id ${id} not found`);
    }
    return posture;
  } catch (error) {
    return error;
  }
};

export const getAllPosturesByReportId = async (reportId: string) => {
  try {
    const postures = await prisma.posture.findMany({ where: { reportId } });
    return postures;
  } catch (error) {
    return error;
  }
};
