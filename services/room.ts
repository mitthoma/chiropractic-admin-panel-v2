import { AxiosInstance } from "axios";

// TODO: give payload typings 
export const createRoomService = (api : AxiosInstance) => ({
  getRooms: async () => {
    const { data } = await api.get('/room/rooms');
    return data.data;
  },

  getRoom: async (payload: object) => {
        const { data } = await api.post('/room/room', payload);
        return data.data;
  },

  addRoom: async (payload: object) => {
    const { data } = await api.post('/room/new-room', payload);
    return data.data;
  },

  updateRoom: async (payload : object) => {
    const { data } = await api.post('/room/update-room', payload);
    return data.data;
  },

  deleteRoom: async (payload : object) => {
    const { data } = await api.post('/room/delete-room', payload);
    return data.data;
  },
});