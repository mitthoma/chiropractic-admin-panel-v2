
// import { Prisma, User } from '@prisma/client';
// import prisma from '../prismaClient';

// console.log("PRISMA CLIENT IS ", prisma);

// export const getAllUsers = async () => {
//   try {
//     const results = await prisma.user.findMany();
//     return results;
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// };

// export const saveNewUser = async (
//     payload: Prisma.UserCreateInput
//   ): Promise<{ success: boolean; user?: User; error?: string }> => {
//     try {
//       const existingUser = await prisma.user.findUnique({ where: { firebaseUid: payload.firebaseUid } });
  
//       if (existingUser) {
//         throw new Error('User with this Firebase UID already exists');
//       }
  
//       const newUser = await prisma.user.create({
//         data: payload,
//       });
  
//       return { success: true, user: newUser };
//     } catch (error: any) {
//       console.log(error);
//       return { success: false, error: (error as Error).message };
//     }
//   };

//   export const updateUser = async (id: number, payload: Prisma.UserUpdateInput) => {
//     try {
//       const user = await prisma.user.findUnique({ where: { id } });
  
//       if (!user) throw new Error('User not found');
  
//       const updatedUser = await prisma.user.update({
//         where: { id },
//         data: payload
//       });
  
//       return updatedUser;
//     } catch (error) {
//       console.log(error);
//       return error;
//     }
//   };

// export const deleteUser = async (id: number) => {
//   try {
//     const result = await prisma.user.delete({ where: { id } });
//     return true;
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// };

// export const getUser = async (id: number) => {
//   try {
//     const user = await prisma.user.findUnique({ where: { id } });

//     if (!user) throw new Error('User not found');

//     return user;
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// };

// // export const getUserByFirebaseUid = async (firebaseUid: String) => {
// //   try {
// //     const user = await prisma.user.findUnique({ where: { firebaseUid } });

// //     if (!user) throw new Error('User not found');

// //     return user;
// //   } catch (error) {
// //     console.log(error);
// //     return error;
// //   }
// // };