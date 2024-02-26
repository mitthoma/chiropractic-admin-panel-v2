export default defineEventHandler((event) => {
  if (event.path.includes('patient/')) {
    if (getMethod(event) !== 'OPTIONS') {
      const authHeader = event.node.req.headers.authorization;
      console.log(
        'auth middleware!',
        `method: ${getMethod(event)}`,
        `path: ${event.path}`,
        `authHeader: ${authHeader}`
      );
    }
  }
});
