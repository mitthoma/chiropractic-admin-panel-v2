import { AxiosInstance } from "axios";

// TODO: give payload typings 
export const createEntryService = (api : AxiosInstance) => ({
    getEntriesForNote: async (payload : any) => {
        const { data } = await api.post('/entry/note-entries', payload);
        return data.data;
    },

    getEntry:  async (payload : any) => {
        const { data } = await api.get('/entry/entry', payload);
        return data.data;
    },

    addEntry: async (payload : any, noteId : any) => {
        console.log('HITTING ADD ENTRY');
        console.log("note id is ", noteId);
        payload = {
            ...payload,
            noteId
        }
        console.log('IN ENTRY SERVICE AND PAYLOAD IS ', payload);
        const { data } = await api.post('/entry/entry', payload);
        return data.data;
    },

    updateEntry:  async (payload : any) => {
        const { data } = await api.post('/entry/update-entry', payload);
        return data.data;
    },

    deleteEntry: async (payload : any) => {
        const { data } = await api.post('/entry/delete-entry', payload);
        return data.data;
    }
});

