import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface PosturePayload {
  name: string;
  wnl?: string;
  tiltName?: string;
  tiltEst?: string;
  translationName?: string;
  translationEst?: string;
  rotation?: string;
  lordKyph?: string;
  pronated?: string;
  supinated?: string;
  reportId: string;
}

export const addPosture = async (payload: PosturePayload) => {
  try {
    const reportId = payload.reportId;

    const report = await prisma.report.findUnique({ where: { id: reportId } });
    if (!report) {
      throw new Error(`Report with id ${reportId} not found`);
    }
    const newPosture = await prisma.posture.create({
      data: {
        name: payload.name,
        wnl: payload.wnl,
        tiltName: payload.tiltName,
        tiltEst: payload.tiltEst,
        translationName: payload.translationName,
        translationEst: payload.translationEst,
        rotation: payload.rotation,
        lordKyph: payload.lordKyph,
        pronated: payload.pronated,
        supinated: payload.supinated,
        report: {
          connect: {
            id: reportId,
          },
        },
      },
    });

    return newPosture;
  } catch (error) {
    console.error('error adding posture:', error);
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
