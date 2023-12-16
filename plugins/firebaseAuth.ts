import { initializeApp } from "firebase/app";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  // Your web app's Firebase configuration
  // create below firebase config again but with config.public

  const firebaseConfig = {
    apiKey: config.public.FIREBASE_API_KEY,
    authDomain: config.public.FIREBASE_AUTH_DOMAIN,
    projectId: config.public.FIREBASE_PROJECT_ID,
    storageBucket: config.public.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: config.public.FIREBASE_MESSAGING_SENDER_ID,
    appId: config.public.FIREBASE_APP_ID,
  };

  // const firebaseConfig = {
  //     apiKey: "AIzaSyAW9gqgxAIw7tUhc4vaTR72mI13E3HsxOg",
  //     authDomain: "nuxt3-firebase-newton.firebaseapp.com",
  //     projectId: "nuxt3-firebase-newton",
  //     storageBucket: "nuxt3-firebase-newton.appspot.com",
  //     messagingSenderId: "465500202689",
  //     appId: "1:465500202689:web:abaab7f190a9326ed51640",
  // };

  // Initialize Firebase
  initializeApp(firebaseConfig);
});
