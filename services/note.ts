import { AxiosInstance } from 'axios';
import { ExportExcelRequest } from '~~/types/datamodel';

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
    const { data } = await api.post('/notes/update-note', payload);
    return data.data;
  },

  deleteNote: async (payload: any) => {
    const { data } = await api.post('/notes/delete-note', payload);
    return data.data;
  },
  exportNote: async (payload: any) => {
    // first, load the data we need
    const { data } = await api.post('/notes/export-note', payload);
    if (!data.success || !data.body) {
      console.error('failed to load note data mappings for export:', data);
      return;
    }

    const exportNotePayload: ExportExcelRequest = {
      dataMappings: data.body,
      noteID: payload,
      templateName: 'export-note',
    };

    // make the request to our service
    try {
      const response = await fetch(
        process.env.EXPORT_EXCEL_API_URL ||
          'http://localhost:3001/api/export-excel',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(exportNotePayload),
        }
      );

      if (!response.ok) {
        console.error('excel export service failed to export note');
        return;
      }
      const blob = await response.blob();
      downloadFile(blob, 'export-note-result.xlsx');
    } catch (error) {
      console.error('Error exporting note to excel:', error);
    }
  },
});
