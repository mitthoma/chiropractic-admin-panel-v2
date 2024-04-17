import { AxiosInstance } from 'axios';
// import { ExportExcelRequest } from '~~/types/datamodel';

// const config = useRuntimeConfig();

// interface ExportNotePayload {
//   /** ID of note to export */
//   noteId: string;
//   /** filename to give the excel file we download */
//   filename: string;
// }

// TODO: give payload typings
export const createNoteService = (api: AxiosInstance) => ({
  getNotes: async () => {
    const { data } = await api.get('/notes/notes');
    return data.data;
  },

  getNotesForPatient: async (payload: any) => {
    const { data } = await api.post('/notes/patient-notes', payload);
    return data.data;
  },

  getNote: async (payload: any) => {
    const { data } = await api.post('/notes/note-id', payload);
    return data.data;
  },

  addNote: async (payload: any, patientId: number) => {
    payload = {
      ...payload,
      patientId,
    };
    const { data } = await api.post('/notes/note', payload);
    return data;
  },

  updateNote: async (payload: any) => {
    console.log('UPDATE NOTE PAYLOAD IS ', payload);
    const { data } = await api.post('/notes/update-note', payload);
    console.log('data returned is ', data);
    return data.data;
  },

  deleteNote: async (payload: any) => {
    const { data } = await api.post('/notes/delete-note', payload);
    return data.data;
  },
  // exportNote: async (payload: ExportNotePayload) => {
  //   // first, load the data we need
  //   const { noteId, filename } = payload;
  //   const { data } = await api.post('/notes/export-note', {
  //     noteId,
  //   });
  //   if (!data.success || !data.body) {
  //     console.error('failed to load note data mappings for export:', data);
  //     return;
  //   }

  //   const exportNotePayload: ExportExcelRequest = {
  //     dataMappings: data.body,
  //     noteID: noteId,
  //     templateName: 'export-note',
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

  //     const response = await fetch(serverURL, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(exportNotePayload),
  //     });

  //     if (!response.ok) {
  //       console.error('excel export service failed to export note');
  //       return;
  //     }
  //     const blob = await response.blob();
  //     downloadFile(blob, filename);
  //   } catch (error) {
  //     console.error('Error exporting note to excel:', error);
  //   }
  // },
});
