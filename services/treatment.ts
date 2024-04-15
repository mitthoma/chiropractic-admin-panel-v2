import { AxiosInstance } from 'axios';

export const createTreatmentService = (api: AxiosInstance) => ({
  getTreatmentsForNote: async (payload: any) => {
    const { data } = await api.post('/treatment/note-treatments', payload);
    return data.data;
  },

  getTreatment: async (payload: any) => {
    const { data } = await api.get('/treatment/treatment', payload);
    return data.data;
  },

  addTreatment: async (payload: any) => {
    console.log(
      'in the add treatment service function and the payload is ',
      payload
    );
    const { data } = await api.post('/treatment/treatment', payload);
    return data;
  },

  updateTreatment: async (payload: any) => {
    console.log('payload is ', payload);
    const { data } = await api.post('/treatment/update-treatment', payload);
    return data.data;
  },

  deleteTreatment: async (payload: any) => {
    const { data } = await api.post('/treatment/delete-treatment', payload);
    return data.data;
  },
});
