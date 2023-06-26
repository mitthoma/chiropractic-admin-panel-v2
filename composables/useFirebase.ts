//https://firebase.google.com/docs/auth/web/start

import { AxiosInstance } from "axios";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { createAuthService } from "~/services/auth";
import { createUserService } from "~/services/user";
import { userStore } from '~/store/user';
import { user } from "@prisma/client";
import { getApiInstance } from "~/utils/apiInstance";



export const createUser = async (email : string, password : string) => {
    const auth = getAuth();

    const credentials = await createUserWithEmailAndPassword(auth, email, password)
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });

        return credentials;
}

export const signInUser = async (email: string, password: string) => {
    const api = getApiInstance();
    const auth = getAuth();
    const authService = createAuthService(api as AxiosInstance);
    const store = userStore();
    try {
        const credentials = await signInWithEmailAndPassword(auth, email, password);
        if (credentials) {
            const res = await authService.signInUserWithAPI(credentials.user.uid);
            if (res instanceof Error) {
                return {
                    error: res.message
                }
            } else if (credentials && res) {
                store.setUser(res);
                store.setIsLoggedIn(true);
                return { success: true, credentials };
            } else {
                return { success: false, error: 'Error signing user in.' };
            }
        }
        const res = { success: false, error: 'Error signing user in. Not receiving credentials from Firebase' }
        return res
    } catch (error : any) {
        console.log('Error signing user in:', error);
        return { success: false, error: error.message };
    }
  };


  export const initUser = async () => {
    const api = getApiInstance();
    const auth = getAuth();
    const store = userStore();
    const userService = createUserService(api as AxiosInstance);
  
    return new Promise((resolve) => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          // If the user is logged in, fetch their data from your PostgreSQL database
          const response = await userService.getUserByFirebaseUID(user.uid);

          // console.log('response is ', response);
  
          if (response instanceof Error) {
            // console.log("Invalid response from getUserByFirebaseUID");
            // Update the store with the user data
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
}


