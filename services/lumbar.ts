import { AxiosInstance } from 'axios';

export const createLumbarService = (api: AxiosInstance) => ({
  getLumbarsForReport: async (payload: any) => {
    const { data } = await api.post('/lumbar/report-lumbars', payload);
    return data.data;
  },

  getLumbar: async (payload: any) => {
    const { data } = await api.get('/lumbar/lumbar', payload);
    return data.data;
  },

  addLumbar: async (payload: any) => {
    console.log('calling add ', payload);

    const { data } = await api.post('/lumbar/lumbar', payload);
    return data.data;
  },

  updateLumbar: async (payload: any) => {
    console.log('calling update ', payload);
    const { data } = await api.post('/lumbar/update', payload);
    return data.data;
  },

  deleteLumbar: async (payload: any) => {
    const { data } = await api.post('/lumbar/delete', payload);
    return data.data;
  },
});
