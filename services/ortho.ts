import { AxiosInstance } from 'axios';

export const createOrthoService = (api: AxiosInstance) => ({
  getOrthoSeatedsForReport: async (payload: any) => {
    const { data } = await api.post('/ortho/seated/report-seateds', payload);
    return data.data;
  },

  getOrthoSeated: async (payload: any) => {
    const { data } = await api.get('/ortho/seated/seated', payload);
    return data.data;
  },

  addOrthoSeated: async (payload: any) => {
    const { data } = await api.post('/ortho/seated/seated', payload);
    return data.data;
  },

  updateOrthoSeated: async (payload: any) => {
    const { data } = await api.post('/ortho/seated/update', payload);
    return data.data;
  },

  deleteOrthoSeated: async (payload: any) => {
    const { data } = await api.post('/ortho/seated/delete', payload);
    return data.data;
  },

  getOrthoPronesForReport: async (payload: any) => {
    const { data } = await api.post('/ortho/prone/report-prones', payload);
    return data.data;
  },

  getOrthoProne: async (payload: any) => {
    const { data } = await api.get('/ortho/prone/prone', payload);
    return data.data;
  },

  addOrthoProne: async (payload: any) => {
    const { data } = await api.post('/ortho/prone/prone', payload);
    return data.data;
  },

  updateOrthoProne: async (payload: any) => {
    const { data } = await api.post('/ortho/prone/update', payload);
    return data.data;
  },

  deleteOrthoProne: async (payload: any) => {
    const { data } = await api.post('/ortho/prone/delete', payload);
    return data.data;
  },

  getOrthoStandingsForReport: async (payload: any) => {
    const { data } = await api.post(
      '/ortho/standing/report-standings',
      payload
    );
    return data.data;
  },

  getOrthoStanding: async (payload: any) => {
    const { data } = await api.get('/ortho/standing/standing', payload);
    return data.data;
  },

  addOrthoStanding: async (payload: any) => {
    const { data } = await api.post('/ortho/standing/standing', payload);
    return data.data;
  },

  updateOrthoStanding: async (payload: any) => {
    const { data } = await api.post('/ortho/standing/update', payload);
    return data.data;
  },

  deleteOrthoStanding: async (payload: any) => {
    const { data } = await api.post('/ortho/standing/delete', payload);
    return data.data;
  },

  getOrthoSupinesForReport: async (payload: any) => {
    const { data } = await api.post('/ortho/supine/report-supines', payload);
    return data.data;
  },

  getOrthoSupine: async (payload: any) => {
    const { data } = await api.get('/ortho/supine/supine', payload);
    return data.data;
  },

  addOrthoSupine: async (payload: any) => {
    const { data } = await api.post('/ortho/supine/supine', payload);
    return data.data;
  },

  updateOrthoSupine: async (payload: any) => {
    const { data } = await api.post('/ortho/supine/update', payload);
    return data.data;
  },

  deleteOrthoSupine: async (payload: any) => {
    const { data } = await api.post('/ortho/supine/delete', payload);
    return data.data;
  },
});
