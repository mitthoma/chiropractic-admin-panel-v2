import { userStore } from '~~/store/user';

interface RouteMeta {
  auth?: boolean;
}

export default defineNuxtRouteMiddleware((to) => {
  const store = userStore();
  const meta = to.meta as RouteMeta;

  if (meta && meta.auth !== false && !store.getIsLoggedIn) {
    return { path: '/' };
  }
});
