import { getAuth } from 'firebase-admin/auth';

export default defineEventHandler(async (event) => {
  if (event.path.includes('/patient/delete-patient')) {
    if (getMethod(event) !== 'OPTIONS') {
      const authHeader = event.node.req.headers.authorization;
      if (!authHeader) {
        console.log('authentication failed: no auth header present');
        console.log(
          'auth middleware: failure...',
          `method: ${getMethod(event)}`,
          `path: ${event.path}`,
          `authHeader: ${authHeader}`
        );
        event.node.res.statusCode = 401;
        return 'UNAUTHORIZED';
      }
      try {
        const auth = getAuth();
        const decodedToken = await auth.verifyIdToken(authHeader);
        console.log(
          'auth middleware: success!',
          `method: ${getMethod(event)}`,
          `path: ${event.path}`,
          `authHeader: ${authHeader}`,
          `uid: ${decodedToken.uid}`,
          `user-email: ${decodedToken.email}`
        );
      } catch {
        console.log(
          'authentication failed: error occurred while verifying token'
        );
        console.log(
          'auth middleware: failure...',
          `method: ${getMethod(event)}`,
          `path: ${event.path}`,
          `authHeader: ${authHeader}`
        );
        event.node.res.statusCode = 401;
        return 'UNAUTHORIZED';
      }
    }
  }
});
