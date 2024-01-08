import { AxiosInstance } from 'axios';

export const createMyoDermService = (api: AxiosInstance) => ({
  getMyoDermsForReport: async (payload: any) => {
    const { data } = await api.post('/myo-derm/report-myo-derms', payload);
    return data.data;
  },

  getMyoDerm: async (payload: any) => {
    const { data } = await api.get('/myo-derm/myo-derm', payload);
    return data.data;
  },

  addMyoDerm: async (payload: any) => {
    const { data } = await api.post('/myo-derm/myo-derm', payload);
    return data.data;
  },

  updateMyoDerm: async (payload: any) => {
    const { data } = await api.post('/myo-derm/update', payload);
    return data.data;
  },

  deleteMyoDerm: async (payload: any) => {
    const { data } = await api.post('/myo-derm/delete', payload);
    return data.data;
  },
});
