export default defineNuxtRouteMiddleware((to, _from) => {
  if (to.path.includes('/patient')) {
    // const user = userStore();
    // const token = user.getToken;
    // attempt to add auth header
    console.log('going to a patient route:', to.path);
  }
});
