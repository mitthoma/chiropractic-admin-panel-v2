//https://firebase.google.com/docs/auth/web/start

import { AxiosInstance } from "axios";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { createAuthService } from "~/services/auth";
import { createUserService } from "~/services/user";
import { userStore } from '~/store/user';
import { user } from "@prisma/client";
import { getApiInstance } from "~/utils/apiInstance";



export const createUser = async (email : string, password : string) => {
  if (!password) {
    throw new Error('Password is not provided');
  }
  const auth = getAuth();
  console.log('creating a user with email ', email, ' and password ', password);
  try {
    const credentials = await createUserWithEmailAndPassword(auth, email, password);
    console.log('credentials are ', credentials);
    return credentials;
  } catch (error: any) {
    console.log('Error while creating user:', error.code, error.message);
    throw error;  // This will propagate the error so that you can see the details where createUser is being called
  }
}
export const signInUser = async (email: string, password: string) => {
  console.log('SIGN IN USER BEING CALLED');
    const api = getApiInstance();
    const auth = getAuth();
    const authService = createAuthService(api as AxiosInstance);
    const store = userStore();
    try {
        const credentials = await signInWithEmailAndPassword(auth, email, password);
        console.log('const credentials after sign in with firebase is ', credentials);
        if (credentials) {
          console.log('now using auth service to sign in user with api and using the credentials user uid');
          const res = await authService.signInUserWithAPI(credentials.user.uid);
          if (res instanceof Error) {
              console.log(res.message);
              return { success: false, error: res.message };
          } else if (res) {
            console.log('sign in user with api is successful, now setting the user to the store and setting isLoggedIn to true');
              store.setUser(res);
              store.setIsLoggedIn(true);
              return { success: true };
          } else {
              return { success: false, error: 'Error signing user in.' };
          }
      }
      return { success: false, error: 'Error signing user in. Not receiving credentials from Firebase' }
    } catch (error) {
        console.log(error);
        return { success: false };
    }
  };


  export const initUser = async () => {
    console.log('we are now in useFirebase and calling initUser');
    const api = getApiInstance();
    const auth = getAuth();
    const store = userStore();
    const userService = createUserService(api as AxiosInstance);
  
    return new Promise((resolve) => {
      onAuthStateChanged(auth, async (user) => {
        console.log('in initUser but in onAuthStateChanged and user is null');

        if (user) {
          console.log('in initUser but in onAuthStateChanged and user is ', user);
          // If the user is logged in, fetch their data from your PostgreSQL database
          console.log('about to get this user by firebaseUID from the user service');
          const response = await userService.getUserByFirebaseUID({ firebaseUid: user.uid });
          console.log('response from that is ', response);

          // console.log('response is ', response);
  
          if (response instanceof Error) {
            // console.log("Invalid response from getUserByFirebaseUID");
            // Update the store with the user data
          } else {
            console.log('we are setting the user in the store');
            console.log('we are also setting isLoggedIn to true');
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
}


