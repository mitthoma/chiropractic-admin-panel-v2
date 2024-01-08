import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface MyoDermPayload {
  name: string;
  wnl?: string;
  lt?: string;
  rt?: string;
  notes?: string;
  reportId: string;
}

export const addMyoDerm = async (payload: MyoDermPayload) => {
  try {
    const reportId = payload.reportId;

    const report = await prisma.report.findUnique({ where: { id: reportId } });
    if (!report) {
      throw new Error(`Report with id ${reportId} not found`);
    }
    const newMyoDerm = await prisma.myoDerm.create({
      data: {
        name: payload.name,
        wnl: payload.wnl,
        lt: payload.lt,
        rt: payload.rt,
        notes: payload.notes,
        report: {
          connect: {
            id: reportId,
          },
        },
      },
    });

    return newMyoDerm;
  } catch (error) {
    return error;
  }
};

export const deleteMyoDerm = async (myoDermId: string) => {
  try {
    await prisma.myoDerm.delete({ where: { id: myoDermId } });
    return true;
  } catch (error) {
    return error;
  }
};

export const updateMyoDerm = async (
  myoDermId: string,
  payload: Partial<MyoDermPayload>
) => {
  try {
    const updatedMyoDerm = await prisma.myoDerm.update({
      where: { id: myoDermId },
      data: payload,
    });
    return updatedMyoDerm;
  } catch (error) {
    return error;
  }
};

export const getMyoDermById = async (id: string) => {
  try {
    const myoDerm = await prisma.myoDerm.findUnique({ where: { id } });
    if (!myoDerm) {
      throw new Error(`MyoDerm with id ${id} not found`);
    }
    return myoDerm;
  } catch (error) {
    return error;
  }
};

export const getAllMyoDermsByReportId = async (reportId: string) => {
  try {
    const myoDerms = await prisma.myoDerm.findMany({ where: { reportId } });
    return myoDerms;
  } catch (error) {
    return error;
  }
};
