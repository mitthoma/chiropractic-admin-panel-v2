import { AxiosInstance } from 'axios';

export const createReportService = (api: AxiosInstance) => ({
  getReports: async () => {
    const { data } = await api.get('/report/reports');
    return data.data;
  },

  getReportsForPatient: async (payload: any) => {
    const { data } = await api.post('/report/patient-reports', payload);
    return data.data;
  },

  getReport: async (payload: any) => {
    const { data } = await api.post('/report/id', payload);
    return data.data;
  },

  addReport: async (payload: any, patientId: number) => {
    payload = {
      ...payload,
      patientId,
    };
    const { data } = await api.post('/report/report', payload);
    return data;
  },

  updateReport: async (payload: any) => {
    const { data } = await api.post('/report/update', payload);
    return data.data;
  },

  deleteReport: async (payload: any) => {
    const { data } = await api.post('/report/delete', payload);
    return data.data;
  },
});
