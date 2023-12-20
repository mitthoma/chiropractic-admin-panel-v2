import { AxiosInstance } from "axios";

export const createTreatmentService = (api: AxiosInstance) => ({
  getTreatmentsForNote: async (payload: any) => {
    const { data } = await api.post("/treatment/note-treatments", payload);
    return data.data;
  },

  getTreatment: async (payload: any) => {
    const { data } = await api.get("/treatment/treatment", payload);
    return data.data;
  },

  addTreatment: async (payload: any, noteId: any) => {
    payload = {
      ...payload,
      noteId,
    };
    console.log('sending endpoint for treatment/treatment');
    const { data } = await api.post("/treatment/treatment", payload);
    console.log('data returned from treatment/treatment is ', data);
    return data.data;
  },

  updateTreatment: async (payload: any) => {
    const { data } = await api.post("/treatment/update-treatment", payload);
    return data.data;
  },

  deleteTreatment: async (payload: any) => {
    const { data } = await api.post("/treatment/delete-treatment", payload);
    return data.data;
  },
});
