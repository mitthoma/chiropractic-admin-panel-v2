<template>
  <v-app id="inspire">
    <v-container
      v-if="!isLoggedIn"
      fluid
      fill-height
      align-center
      justify-center
      class="login-background"
    >
      <v-row align="center" justify="center" class="h-screen">
        <v-col cols="12" sm="10" md="8" lg="6" xl="5">
          <v-card class="rounded-xl" elevation="8">
            <!-- Header Section -->
            <div class="text-center pt-8 pb-4">
              <v-avatar color="primary" size="64" class="mb-3">
                <v-icon
                  icon="mdi-hospital-building"
                  size="40"
                  color="white"
                ></v-icon>
              </v-avatar>
              <h1 class="text-h4 font-weight-bold text-primary mb-2">
                Chiropractic Admin
              </h1>
              <p class="text-body-1 text-medium-emphasis">
                Practice Management System
              </p>
            </div>

            <v-divider class="my-4"></v-divider>

            <!-- Demo Mode Section -->
            <v-card-text v-if="showDemoMode" class="px-8">
              <div class="text-center mb-4">
                <v-chip color="success" size="small" class="mb-2">
                  <v-icon start icon="mdi-play-circle"></v-icon>
                  Demo Mode
                </v-chip>
                <h2 class="text-h5 font-weight-bold mb-2">Start Demo</h2>
                <p class="text-body-2 text-medium-emphasis">
                  Select a demo account to explore the platform
                </p>
              </div>

              <v-list class="demo-user-list">
                <v-list-item
                  v-for="user in demoUsers"
                  :key="user.email"
                  class="demo-user-card mb-3 rounded-lg"
                  :class="{
                    'demo-user-selected': selectedDemoUser === user.email,
                  }"
                  @click="selectDemoUser(user.email)"
                >
                  <template #prepend>
                    <v-avatar color="primary" size="48">
                      <span class="text-h6"
                        >{{ user.firstName[0] }}{{ user.lastName[0] }}</span
                      >
                    </v-avatar>
                  </template>
                  <v-list-item-title class="font-weight-bold">
                    Dr. {{ user.firstName }} {{ user.lastName }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ user.email }}
                  </v-list-item-subtitle>
                  <template #append>
                    <v-icon
                      v-if="selectedDemoUser === user.email"
                      icon="mdi-check-circle"
                      color="primary"
                    ></v-icon>
                  </template>
                </v-list-item>
              </v-list>

              <v-btn
                block
                size="large"
                color="primary"
                class="mt-4 mb-2"
                :disabled="!selectedDemoUser || loading"
                @click="signInDemo"
              >
                <v-icon start icon="mdi-login"></v-icon>
                Enter Demo
              </v-btn>

              <v-btn
                block
                variant="text"
                size="small"
                @click="showDemoMode = false"
              >
                Use Regular Login
              </v-btn>
            </v-card-text>

            <!-- Regular Login Section -->
            <v-card-text v-else class="px-8">
              <div class="text-center mb-4">
                <h2 class="text-h5 font-weight-bold mb-2">Sign In</h2>
                <p class="text-body-2 text-medium-emphasis">
                  Enter your credentials to access your account
                </p>
              </div>

              <v-form ref="loginForm" @submit.prevent="signIn">
                <v-text-field
                  v-model="email"
                  :rules="rules"
                  label="Email"
                  variant="outlined"
                  density="comfortable"
                  :disabled="loading"
                  prepend-inner-icon="mdi-email"
                  class="mb-2"
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  :type="visible ? 'text' : 'password'"
                  label="Password"
                  density="comfortable"
                  variant="outlined"
                  :rules="rules"
                  :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                  prepend-inner-icon="mdi-lock"
                  :disabled="loading"
                  class="mb-2"
                  @click:append-inner="visible = !visible"
                >
                </v-text-field>
                <v-btn
                  block
                  size="large"
                  color="primary"
                  :disabled="loading"
                  type="submit"
                  class="mb-3"
                >
                  <v-icon start icon="mdi-login"></v-icon>
                  Sign In
                </v-btn>
                <div class="text-center">
                  <v-btn
                    variant="text"
                    size="small"
                    @click="showResetDialog = true"
                  >
                    Forgot password?
                  </v-btn>
                </div>

                <v-divider class="my-4"></v-divider>

                <v-btn
                  block
                  variant="outlined"
                  color="primary"
                  size="large"
                  class="mb-4"
                  @click="showDemoMode = true"
                >
                  <v-icon start icon="mdi-play-circle"></v-icon>
                  Start Demo Mode
                </v-btn>
              </v-form>
            </v-card-text>

            <!-- Password Reset Dialog -->
            <v-dialog
              v-if="clientSide"
              v-model="showResetDialog"
              class="align-center"
            >
              <v-row>
                <v-col cols="3"></v-col>
                <v-col cols="6">
                  <v-card class="py-5">
                    <v-card-title> Forgot password </v-card-title>
                    <v-card-text>
                      <v-form ref="resetForm">
                        <v-text-field
                          v-model="resetEmail"
                          label="Email"
                          variant="outlined"
                          dense
                        ></v-text-field>
                        <v-btn
                          color="primary"
                          :disabled="loading"
                          @click="sendResetEmail"
                        >
                          Send reset email
                        </v-btn>
                      </v-form>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="3"></v-col>
              </v-row>
            </v-dialog>
            <!--
              Apparently if you are rendering a tag with values that only exist on the client (i.e. not tied to server side values)
              you can get "Hypdration completed but contains mismatches" errors. This is caused when html on server side rendering doesn't match client side.

              You can use "client-only" wrapper to resolve this. I had to do this because it was causing other weird errors.
              Anyway, just an FYI for what this client-only tag is for.
              https://stackoverflow.com/questions/73394431/why-do-i-get-this-hydration-warning-when-using-usestate-in-nuxt-3
            -->
            <client-only>
              <v-snackbar
                v-model="loginUnsuccessful"
                color="orange-lighten-1"
                timeout="10000"
                vertical
                multi-line
              >
                <p>Login unsuccessful</p>
                <p>{{ errorMessage }}</p>
              </v-snackbar>
            </client-only>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <NuxtLayout v-else name="default"> </NuxtLayout>
  </v-app>
</template>

<script>
import { userStore } from './store/user';
import { demoUsers } from './composables/useFirebase';

export default {
  data() {
    return {
      visible: false,
      email: '',
      password: '',
      loginUnsuccessful: false,
      errorMessage: '',
      store: null,
      loading: false,
      passwordVisibility: false,
      showResetDialog: false,
      resetEmail: '',
      clientSide: false,
      showDemoMode: false,
      selectedDemoUser: null,
      demoUsers,
      rules: [
        (value) => {
          if (value) return true;
          return 'This field must not be blank.';
        },
      ],
    };
  },
  computed: {
    isAuthInitialized() {
      if (this.store) {
        return this.store.getAuthInitialized;
      } else {
        return null;
      }
    },
    isLoggedIn() {
      if (this.store) {
        return this.store.getIsLoggedIn;
      } else {
        return null;
      }
    },
  },
  watch: {
    isLoggedIn(newVal) {
      if (newVal) {
        // You could handle reinitialization logic here, like resetting the store or fetching the updated user data
        this.initUser();
      }
    },
  },
  async mounted() {
    this.store = userStore();
    await this.initUser();
    this.clientSide = true;
  },
  methods: {
    async signIn() {
      if (!this.email || !this.password) {
        return;
      }
      this.loading = true;
      try {
        const result = await signInUser(this.email, this.password);
        // success
        if (result.success) {
          this.loginUnsuccessful = false;
          this.email = '';
          this.password = '';
          this.passwordVisibility = false;
        }
        // failure
        else {
          this.loginUnsuccessful = true;
          if (result.error) {
            // check for common errors, like user not found or bad credentials
            const err = result.error;
            if (err.includes('auth/user-not-found')) {
              this.errorMessage =
                'User not found. Please confirm the correct email is entered.';
            } else if (err.includes('auth/wrong-password')) {
              this.errorMessage =
                'Incorrect email or password combination. Please confirm the correct credentials have been entered and try again.';
            } else if (err.includes('auth/invalid-email')) {
              this.errorMessage =
                'Invalid email. Please confirm that a valid email has been entered and try again.';
            } else {
              this.errorMessage = result.error;
            }
          } else {
            this.errorMessage = 'An unknown error occurred.';
          }
        }
      } catch (err) {
        console.error('Sign in unsuccessful', err);
        this.loginUnsuccessful = true;
        this.errorMessage = 'An unexpected error has occurred.';
      } finally {
        this.loading = false;
      }
    },
    async initUser() {
      await initUser();
      this.store.setAuthInitialized(true);
    },
    async sendResetEmail() {
      this.loading = true;
      try {
        await resetPassword(this.resetEmail);
        this.store.reset(); // Assuming reset() is a method that resets your store
        location.reload(); // Reload the page
      } catch (err) {
        console.log('Failed to send reset email', err);
        // Show an error message
      } finally {
        this.loading = false;
        this.showResetDialog = false;
        this.resetEmail = '';
      }
    },
    selectDemoUser(email) {
      this.selectedDemoUser = email;
    },
    async signInDemo() {
      if (!this.selectedDemoUser) {
        return;
      }
      this.loading = true;
      try {
        const result = await signInDemoUser(this.selectedDemoUser);
        if (result.success) {
          this.loginUnsuccessful = false;
          this.selectedDemoUser = null;
          // Set demo mode in demo store
          const { demoStore } = await import('./store/demo');
          const demo = demoStore();
          demo.setIsDemo(true);
        } else {
          this.loginUnsuccessful = true;
          this.errorMessage =
            result.error || 'Failed to sign in with demo account';
        }
      } catch (err) {
        console.error('Demo sign in unsuccessful', err);
        this.loginUnsuccessful = true;
        this.errorMessage = 'An unexpected error has occurred.';
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.login-background {
  background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%);
}

.demo-user-list {
  background: transparent;
}

.demo-user-card {
  background: rgb(var(--v-theme-surface-variant));
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.demo-user-card:hover {
  background: rgb(var(--v-theme-surface-bright));
  border-color: rgb(var(--v-theme-primary));
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(var(--v-theme-primary), 0.15);
}

.demo-user-selected {
  background: rgb(var(--v-theme-primary));
  background: rgba(var(--v-theme-primary), 0.12);
  border-color: rgb(var(--v-theme-primary));
}

.rounded-xl {
  border-radius: 24px !important;
}
</style>
