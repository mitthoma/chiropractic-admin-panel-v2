import { User } from '../entity/User';
import { initDataSource } from '../database';

const AppDataSource = initDataSource();

export const getAllUsers = async () => {
  try {
    const query = AppDataSource.getRepository(User).createQueryBuilder('user');

    const [results] = await query.getManyAndCount();
    return results;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// SaveNewUser
export const saveNewUser = async (
  payload: Partial<User>
): Promise<{ success: boolean; user?: User; error?: string }> => {
  try {
    const userRepository = AppDataSource.getRepository(User);

    // Check if a user with the same firebaseUid already exists
    const existingUser = await userRepository.findOne({
      where: { firebaseUid: payload.firebaseUid },
    });
    if (existingUser) {
      throw new Error('User with this Firebase UID already exists');
    }

    const newUser = userRepository.create(payload);
    const savedUser = await userRepository.save(newUser);
    return { success: true, user: savedUser };
  } catch (error: any) {
    console.log(error);
    return { success: false, error: (error as Error).message };
  }
};

// UpdateUser
export const updateUser = async (id: number, payload: Partial<User>) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id } });

    if (!user) throw new Error('User not found');

    await userRepository.update(id, payload);
    const updatedUser = await userRepository.findOne({ where: { id } });
    return updatedUser;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// DeleteUser
export const deleteUser = async (id: number) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const result = await userRepository.delete(id);
    return result.affected;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// GetUser
export const getUser = async (id: number) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id } });
    if (!user) throw new Error('User not found');
    return user;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// GetUserByFirebaseUid
export const getUserByFirebaseUid = async (firebaseUid: string) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { firebaseUid } });
    if (!user) throw new Error('User not found');
    return user;
  } catch (error) {
    console.log(error);
    return error;
  }
};
