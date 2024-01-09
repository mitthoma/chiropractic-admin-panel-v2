import { AxiosInstance } from 'axios';

export const createCervicalService = (api: AxiosInstance) => ({
  getCervicalsForReport: async (payload: any) => {
    const { data } = await api.post('/cervical/report-cervicals', payload);
    return data.data;
  },

  getCervical: async (payload: any) => {
    const { data } = await api.get('/cervical/cervical', payload);
    return data.data;
  },

  addCervical: async (payload: any) => {
    const { data } = await api.post('/cervical/cervical', payload);
    return data.data;
  },

  updateCervical: async (payload: any) => {
    const { data } = await api.post('/cervical/update', payload);
    return data.data;
  },

  deleteCervical: async (payload: any) => {
    const { data } = await api.post('/cervical/delete', payload);
    return data.data;
  },
});
