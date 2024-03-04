import { PrismaClient } from '@prisma/client';

/** Prisma client for connections to the database. We instantiate this once here and export it to avoid creating multiple connections to prisma per web client. */
const prisma = new PrismaClient();
console.log('Prisma client connection established');

export default prisma;
