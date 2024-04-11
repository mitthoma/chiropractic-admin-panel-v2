import { AxiosInstance } from 'axios';

export const createTreatmentMethodNameService = (api: AxiosInstance) => ({
  getTreatmentMethodName: async (payload: any) => {
    const { data } = await api.get(
      '/treatment-method-name/method-name',
      payload
    );
    return data.data;
  },

  getTreatmentMethodNames: async (payload: any) => {
    const { data } = await api.get(
      '/treatment-method-name/method-names',
      payload
    );
    console.log('data is ', data);
    return data.data;
  },

  addTreatmentMethodName: async (payload: any) => {
    const { data } = await api.post(
      '/treatment-method-name/method-name',
      payload
    );
    return data.data;
  },

  updateTreatmentMethodName: async (payload: any) => {
    const { data } = await api.post('/treatment-method-name/update', payload);
    return data.data;
  },

  deleteTreatmentMethodName: async (payload: any) => {
    const { data } = await api.post('/treatment-method-name/delete', payload);
    return data.data;
  },
});
