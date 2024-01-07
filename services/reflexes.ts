import { AxiosInstance } from 'axios';

export const createReflexesService = (api: AxiosInstance) => ({
  getReflexessForReport: async (payload: any) => {
    const { data } = await api.post('/reflexes/report-reflexes', payload);
    return data.data;
  },

  getReflexes: async (payload: any) => {
    const { data } = await api.get('/reflexes/reflexes', payload);
    return data.data;
  },

  addReflexes: async (payload: any) => {
    const { data } = await api.post('/reflexes/reflexes', payload);
    return data.data;
  },

  updateReflexes: async (payload: any) => {
    const { data } = await api.post('/reflexes/update', payload);
    return data.data;
  },

  deleteReflexes: async (payload: any) => {
    const { data } = await api.post('/reflexes/delete', payload);
    return data.data;
  },
});
