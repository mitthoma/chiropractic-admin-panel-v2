import { AxiosInstance } from 'axios';

let api: AxiosInstance | null = null;

export function setApiInstance(instance: AxiosInstance): void {
  api = instance;
}

export function getApiInstance(): AxiosInstance | null {
  return api;
}
