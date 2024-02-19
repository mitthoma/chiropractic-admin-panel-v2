<template>
  <v-app id="inspire">
    <v-container
      v-if="!isLoggedIn"
      fluid
      fill-height
      align-center
      justify-center
    >
      <v-row align="center" justify="center" class="h-screen">
        <v-col cols="12" sm="5" md="4">
          <v-card class="w-full max-w-sm">
            <div class="text-center mt-6">
              <v-icon icon="mdi-hospital-building" size="large"></v-icon>
              <p class="font-weight-bold text-medium-emphasis mt-1">
                Pynkerton Chiropractic
              </p>
            </div>
            <v-card-title class="text-center mt-3"> Log In </v-card-title>
            <p class="text-caption text-medium-emphasis text-center">
              Enter your email and password below
            </p>
            <v-card-text>
              <v-form ref="loginForm">
                <v-text-field
                  v-model="email"
                  label="Email"
                  variant="outlined"
                  density="compact"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  :type="visible ? 'text' : 'password'"
                  label="Password"
                  density="compact"
                  variant="outlined"
                  :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                  @click:append-inner="visible = !visible"
                >
                </v-text-field>
                <v-btn
                  block
                  color="primary"
                  :disabled="loading"
                  @click="signIn()"
                >
                  Log In
                </v-btn>
                <div class="text-right mt-2">
                  <v-btn
                    variant="plain"
                    size="x-small"
                    @click="showResetDialog = true"
                  >
                    Forgot password?
                  </v-btn>
                </div>
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
                <!-- <GoogleLogin /> -->
              </v-form>
            </v-card-text>
            <div v-if="loginUnsuccessful">
              <v-card-text color="red">
                Sign in unsuccessful. Please check your user credentials and try
                again.
              </v-card-text>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <NuxtLayout v-else name="default"> </NuxtLayout>
  </v-app>
</template>
<script>
import { userStore } from './store/user';

export default {
  data() {
    return {
      visible: false,
      email: '',
      password: '',
      loginUnsuccessful: false,
      store: null,
      loading: false,
      passwordVisibility: false,
      showResetDialog: false,
      resetEmail: '',
      clientSide: false,
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
      this.loading = true;
      try {
        const result = await signInUser(this.email, this.password);
        if (result.error) {
          this.loginUnsuccessful = true;
        } else {
          // login success
          this.email = '';
          this.password = '';
          this.passwordVisibility = false;
        }
      } catch (err) {
        console.log('Sign in unsuccessful', err);
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
  },
};
</script>
