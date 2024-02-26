// https://firebase.google.com/docs/auth/web/start
import { AxiosInstance } from 'axios';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { user } from '@prisma/client';
import { createAuthService } from '~/services/auth';
import { createUserService } from '~/services/user';
import { userStore } from '~/store/user';
import { getApiInstance } from '~/utils/apiInstance';

export const createUser = async (email: string, password: string) => {
  if (!password) {
    throw new Error('Password is not provided');
  }
  const auth = getAuth();
  const credentials = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  return credentials;
};
export const signInUser = async (email: string, password: string) => {
  const api = getApiInstance();
  const auth = getAuth();
  const authService = createAuthService(api as AxiosInstance);
  const store = userStore();
  try {
    const credentials = await signInWithEmailAndPassword(auth, email, password);
    if (credentials) {
      // get a token from the credentials
      const user = credentials.user;
      const token = await user.getIdToken();
      const res = await authService.signInUserWithAPI(credentials.user.uid);
      if (res instanceof Error) {
        // console.log(res.message);
        return { success: false, error: res.message };
      } else if (res) {
        store.setUser(res);
        store.setIsLoggedIn(true);
        store.setToken(token);
        return { success: true };
      } else {
        return { success: false, error: 'Error signing user in.' };
      }
    }
    return {
      success: false,
      error: 'Error signing user in. Not receiving credentials from Firebase',
    };
  } catch (error) {
    console.log(error);
    return { success: false, error: (error as Error).message };
  }
};

export const initUser = () => {
  const api = getApiInstance();
  const auth = getAuth();
  const store = userStore();
  const userService = createUserService(api as AxiosInstance);

  return new Promise((resolve) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const response = await userService.getUserByFirebaseUID({
          firebaseUid: user.uid,
        });

        if (response instanceof Error) {
          console.log('Invalid response from getUserByFirebaseUID');
        } else {
          store.setUser(response);
          store.setIsLoggedIn(true);
        }
      }
      resolve(null);
    });
  });
};

export const signOutUser = async () => {
  const store = userStore();
  const auth = getAuth();
  const result = await auth.signOut();
  store.setIsLoggedIn(false);
  store.setUser({} as user);
  return result;
};

export const resetPassword = async (email: string) => {
  const auth = getAuth();
  await sendPasswordResetEmail(auth, email);
};
