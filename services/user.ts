import { AxiosInstance } from "axios";


// TODO: give payload typings 
export const createUserService = (api : AxiosInstance) => ({
  getUsers: async () => {
    const { data } = await api.get('/user/users');
    return data.data;
  },

  getUser: async (payload: any) => {
    const { data } = await api.get('/user/user', payload);
    return data.data;
  },
  
  getUserByFirebaseUID: async (payload : any) => {
    console.log('in getUserByFirebaseUID in the USER SERVICE ON FRONTEND and payload is ', payload);
    const { data } = await api.post('/user/user-uid', payload);
    return data.data;
  },
  
  addUser: async (payload: any) => {
    try {
  
      const credentials = await createUser(payload.email, payload.password);
      if (credentials && credentials.user) {
        const firebaseUid = credentials.user.uid;
  
        // Save user data in your PostgreSQL database
        const response = await api.post('/user/user', {
          firstName: payload.firstName,
          lastName: payload.lastName,
          email: payload.email,
          firebaseUid
        });
  
        return response.data;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  
  updateUser: async (payload : any) => {
    const { data } = await api.post('/user/update-user', payload);
    return data.data;
  },
  
  deleteUser: async (payload : any) => {
    const { data } = await api.post('/user/delete-user', payload);
    return data.data;
  },
});