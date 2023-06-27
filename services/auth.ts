import { AxiosInstance } from "axios";

export const createAuthService = (api : AxiosInstance) => ({
  signInUserWithAPI: async (firebaseUid : string) => {
      if (firebaseUid) {
        const response = await api.post('/auth/uid', { firebaseUid });
        return response.data;
      }
    }
  });