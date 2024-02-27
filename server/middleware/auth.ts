/* eslint-disable camelcase */
import { cert, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getApps } from 'firebase/app';

// initialize firebase admin app
const apps = getApps();
if (!apps || apps.length === 0) {
  console.log('FIREBASE ADMIN SDK: initializing app...');
  const project_id = process.env.FIREBASE_ADMIN_PROJECT_ID;
  const private_key = process.env.FIREBASE_ADMIN_PRIVATE_KEY;
  const client_email = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  if (!project_id || !private_key || !client_email) {
    console.error('failed to load firebase admin credentials from environment');
  }
  initializeApp({
    credential: cert({
      projectId: project_id,
      privateKey: private_key,
      clientEmail: client_email,
    }),
  });
  console.log('FIREBASE ADMIN SDK: app initialized!');
} else {
  console.log('firebase apps already initialized:', apps);
}

export default defineEventHandler(async (event) => {
  if (event.path.includes('/patient')) {
    if (getMethod(event) !== 'OPTIONS') {
      const authHeader = event.node.req.headers.authorization;
      if (!authHeader) {
        console.log(
          'auth middleware: request rejected - missing auth header.\n',
          `method: ${getMethod(event)}\n`,
          `path: ${event.path}\n`
        );
        event.node.res.statusCode = 401;
        event.node.res.statusMessage = 'Unauthorized :(';
        // if you return something like text, it seems to cause the client to get stuck on a blank screen with that text.
        // just return and it seems to sort itself out and redirect to the login screen.
        return;
      }
      try {
        const auth = getAuth();
        await auth.verifyIdToken(authHeader);
        // we can add further scrutiny here if we want - like making sure the auth token is for the expected uid
      } catch (e) {
        console.log(
          'auth middleware: request rejected - failed to verify ID token',
          `method: ${getMethod(event)}`,
          `path: ${event.path}`
        );
        event.node.res.statusCode = 401;
        event.node.res.statusMessage = 'Unauthorized :(';
        // eslint-disable-next-line no-useless-return
        return;
      }
    }
  }
});
