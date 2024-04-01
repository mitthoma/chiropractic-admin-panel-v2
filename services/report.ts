import { AxiosInstance } from 'axios';
// import { ExportExcelRequest } from '~~/types/datamodel';

// I have currently commented this export code out as it is causing major issues with nuxt runtime. TODO // fix this later

// const config = useRuntimeConfig();

// interface ExportReportPayload {
//   reportID: string;
//   filename: string;
// }

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
  // exportReport: async (payload: ExportReportPayload) => {
  //   console.log('fetching report data from server...');
  //   const { data } = await api.post('/report/export-report', {
  //     reportID: payload.reportID,
  //   });

  //   const exportNotePayload: ExportExcelRequest = {
  //     dataMappings: data.body,
  //     noteID: payload.reportID,
  //     templateName: 'export-report',
  //   };

  //   // make the request to our service
  //   try {
  //     let serverURL = '';
  //     if (!config.EXPORT_EXCEL_API_URL || config.EXPORT_EXCEL_API_URL === '') {
  //       console.warn(
  //         'EXPORT_EXCEL_API_URL env variable is undefined. Using hard-coded URL.'
  //       );
  //       serverURL = 'https://excel-export-service.fly.dev/api/export-excel';
  //     } else {
  //       serverURL = `${config.EXPORT_EXCEL_API_URL}/api/export-excel`;
  //     }

  //     console.log('sending to export service...');
  //     const response = await fetch(serverURL, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(exportNotePayload),
  //     });

  //     if (!response.ok) {
  //       console.error('excel export service failed to export report');
  //       return;
  //     }
  //     const blob = await response.blob();
  //     downloadFile(blob, payload.filename);
  //   } catch (error) {
  //     console.error('Error exporting report to excel:', error);
  //   }
  // },
});
