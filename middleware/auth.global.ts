import { userStore } from '~~/store/user';

interface RouteMeta {
  auth?: boolean;
}

export default defineNuxtRouteMiddleware((to, _from) => {
  const store = userStore();
  const meta = to.meta as RouteMeta;

  if (meta && meta.auth !== false && !store.getIsLoggedIn && to.path !== '/') {
    console.log('redirecting to login page');
    return { path: '/' };
  }
});
