<template>
  <v-container v-if="!isLoggedIn">
    <v-row class="pt-16">
      <v-col cols="2">
      </v-col>
      <v-col cols="8">
        <v-card class="w-full">
          <v-card-title>
            Log In
          </v-card-title>
          <v-card-text>
            <v-form ref="loginForm">
              <v-text-field
                v-model="email"
                label="Email"
                variant="outlined"
                dense
              ></v-text-field>
              <v-text-field
                v-model="password"
                :type="visible ? 'text' : 'password'"
                label="Password"
                dense
                variant="outlined"
                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="visible = !visible"
              >
              </v-text-field>
              <v-btn
                color="primary"
                :disabled="loading"
                @click="signIn()"
              >
                Log In
              </v-btn>
              <!-- <GoogleLogin /> -->
            </v-form>
          </v-card-text>
          <div v-if="loginUnsuccessful">
            <v-card-text color="red">
              Sign in unsuccessful. Please check your user credentials and try again.
            </v-card-text>
          </div>
          
          </v-card>
        
      </v-col>
      <v-col cols="2">
      </v-col>
    </v-row>
  </v-container>

  <NuxtLayout v-else name="default">

  </NuxtLayout>
</template>
<script>
import { userStore } from './store/user';

export default {
    data () {
        return {
            visible: false,
            email: '',
            password: '',
            loginUnsuccessful: false,
            store: null,
            loading: false,
            passwordVisibility: false,
        }
    },
    computed: {
      isAuthInitialized() {
        if (this.store) {
          return this.store.getAuthInitialized;
        } else  {
          return null;
        }
      },
      isLoggedIn() {
        if (this.store) {
          return this.store.getIsLoggedIn;
        } else  {
          return null;
        }
      },
    },
    async mounted() {
      this.store = userStore();
      await this.initUser();

    },
    methods: {
      async signIn() {
        this.loading = true;
        try {
          const result = await signInUser(this.email, this.password);
          if (result.error) {
            this.loginUnsuccessful = true;
          } else {
            this.$refs.loginForm.reset();
            this.passwordVisibility = false;
          }
        } catch (err) {
          console.log("Sign in unsuccessful", err);
        } finally {
          this.loading = false;
        }
      },
      async initUser() {
        await initUser();
        this.store.setAuthInitialized(true);
    },

    },
}
</script>