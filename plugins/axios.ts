import axios from "axios";
import { setApiInstance } from "@/utils/apiInstance";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const api = axios.create({
    baseURL: config.API_BASE_URL,
    headers: {
      common: {},
    },
  });

  // Set the api instance
  setApiInstance(api);

  // Make the global variable $api available in all components
  nuxtApp.vueApp.config.globalProperties.$api = api;
});
