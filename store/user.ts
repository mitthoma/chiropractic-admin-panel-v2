import { defineStore } from 'pinia';
import { user } from '@prisma/client';

interface UserState {
  user: user;
  isLoggedIn: boolean;
  authInitialized: boolean;
  token: string;
}

export const userStore = defineStore('user', {
  state: () => ({
    user: {} as user,
    isLoggedIn: false,
    authInitialized: false,
    token: '',
  }),

  getters: {
    // getCurrentUser: (state) => state.currentUser,
    getUser: (state: UserState): user | null =>
      Object.keys(state.user).length > 0 ? state.user : null,
    getIsLoggedIn: (state: UserState): boolean => state.isLoggedIn,
    getAuthInitialized: (state: UserState): boolean => state.authInitialized,
    getToken: (state: UserState): string => state.token,
  },
  actions: {
    setIsLoggedIn(value: boolean) {
      this.isLoggedIn = value;
    },
    setUser(user: user) {
      this.user = user;
    },
    setAuthInitialized(value: boolean) {
      this.authInitialized = value;
    },
    setToken(token: string) {
      this.token = token;
    },
  },
});
