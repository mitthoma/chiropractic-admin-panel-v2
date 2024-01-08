import { AxiosInstance } from 'axios';

export const createPostureService = (api: AxiosInstance) => ({
  getPosturesForReport: async (payload: any) => {
    const { data } = await api.post('/posture/report-postures', payload);
    return data.data;
  },

  getPosture: async (payload: any) => {
    const { data } = await api.get('/posture/posture', payload);
    return data.data;
  },

  addPosture: async (payload: any) => {
    const { data } = await api.post('/posture/posture', payload);
    return data.data;
  },

  updatePosture: async (payload: any) => {
    const { data } = await api.post('/posture/update', payload);
    return data.data;
  },

  deletePosture: async (payload: any) => {
    const { data } = await api.post('/posture/delete', payload);
    return data.data;
  },
});
