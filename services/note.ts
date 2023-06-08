import { AxiosInstance } from "axios";

// TODO: give payload typings 
export const createNoteService = (api : AxiosInstance) => ({
    getNotes: async () => {
        const { data } = await api.get('/notes/notes');
        console.log("data is ", data);
        return data.data;
    },

    getNotesForPatient: async (payload : any) => {
        console.log("entering here");
        const { data } = await api.post('/notes/patient-notes', payload);
        console.log('data is ', data.data);
        return data.data;
    },

    getNote: async (payload : any) => {
        const { data } = await api.post('/notes/note-id', payload);
        return data.data;
    },

    addNote: async (payload : any, patientId : number) => {
        console.log('payload is ', payload);
        console.log('patientid is ', patientId);
        payload = {
            ...payload,
            patientId
        }
        const { data } = await api.post('/notes/note', payload);
        console.log('data is ', data);
        console.log('and data.data is ', data.data);
        return data;
    },

    updateNote: async (payload : any) => {
        const { data } = await api.post('/notes/update-note', payload);
        return data.data;
    },

    deleteNote: async (payload : any) => {
        const { data } = await api.post('/notes/delete-note', payload);
        return data.data;
    },
});


