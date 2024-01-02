import { AxiosInstance } from "axios";

export const createTreatmentOptionService = (api: AxiosInstance) => ({
  getTreatmentOptions: async () => {
    const { data } = await api.get("/treatment-option/options");
    return data.data;
  },

  getTreatmentOption: async (payload: object) => {
    const { data } = await api.post("/treatment-option/option", payload);
    return data.data;
  },

  addTreatmentOption: async (payload: object) => {
    const { data } = await api.post("/treatment-option/add", payload);
    return data.data;
  },

  updateTreatmentOption: async (payload: object) => {
    const { data } = await api.post("/treatment-option/update", payload);
    return data.data;
  },

  deleteTreatmentOption: async (payload: object) => {
    const { data } = await api.post("/treatment-option/delete", payload);
    return data.data;
  },
});
