import { AxiosInstance } from 'axios';

export const createTreatmentMethodService = (api: AxiosInstance) => ({
  getTreatmentMethod: async (payload: any) => {
    const { data } = await api.get('/treatment-method/method', payload);
    return data.data;
  },

  getTreatmentMethodsForTreatment: async (payload: any) => {
    const { data } = await api.post('/treatment-method/treatment-id', payload);
    return data.data;
  },

  addTreatmentMethod: async (payload: any) => {
    const { data } = await api.post('/treatment-method/method', payload);
    return data.data;
  },

  updateTreatmentMethod: async (payload: any) => {
    const { data } = await api.post('/treatment-method/update', payload);
    return data.data;
  },

  deleteTreatmentMethod: async (payload: any) => {
    const { data } = await api.post('/treatment-method/delete', payload);
    return data.data;
  },
});
