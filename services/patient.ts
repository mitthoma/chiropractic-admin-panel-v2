import { AxiosInstance } from 'axios';

// TODO: give payload typings
export const createPatientService = (api: AxiosInstance) => ({
  getPatients: async () => {
    const { data } = await api.get('/patient/patients');
    return data.data;
  },

  getPatient: async (payload: object) => {
    const { data } = await api.post('/patient/patient', payload);
    return data.data;
  },

  addPatient: async (payload: object) => {
    const { data } = await api.post('/patient/new-patient', payload);
    return data.data;
  },

  updatePatient: async (payload: object) => {
    const { data } = await api.post('/patient/update-patient', payload);
    return data.data;
  },

  deletePatient: async (payload: object) => {
    const { data } = await api.post('/patient/delete-patient', payload);
    return data.data;
  },
});
