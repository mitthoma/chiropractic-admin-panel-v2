import { AxiosInstance } from 'axios';

// TODO: give payload typings
export const createComplaintService = (api: AxiosInstance) => ({
  getComplaints: async () => {
    const { data } = await api.get('/complaint/complaints');
    return data.data;
  },

  getComplaintsForPatient: async (payload: any) => {
    const { data } = await api.post('/complaint/patient-complaints', payload);
    return data.data;
  },

  getComplaint: async (payload: any) => {
    const { data } = await api.post('/complaint/complaint-id', payload);
    return data.data;
  },

  addComplaint: async (payload: any, patientId: any) => {
    payload = {
      ...payload,
      patientId,
    };
    const { data } = await api.post('/complaint/complaint', payload);
    return data.data;
  },

  updateComplaint: async (payload: any) => {
    const { data } = await api.post('/complaint/update-complaint', payload);
    return data.data;
  },

  deleteComplaint: async (payload: any) => {
    const { data } = await api.post('/complaint/delete-complaint', payload);
    return data.data;
  },
});
