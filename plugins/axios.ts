import axios from 'axios';
import { setApiInstance } from '@/utils/apiInstance';
import { userStore } from '~~/store/user';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const api = axios.create({
    baseURL: config.API_BASE_URL,
    headers: {
      common: {},
    },
  });

  // attach a auth token to every request
  api.interceptors.request.use((config) => {
    const token = userStore().getToken;
    if (token !== '') {
      config.headers.Authorization = token;
    }
    return config;
  });

  // Set the api instance
  setApiInstance(api);

  // Make the global variable $api available in all components
  nuxtApp.vueApp.config.globalProperties.$api = api;
});
