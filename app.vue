<template>
  <!-- <div v-if="!isAuthInitialized">
    <v-container>
      <v-row class="my-24">
        <v-col cols="4"></v-col>
        <v-col style="text-align: center;" cols="4"><h4>Loading...</h4></v-col>
        <v-col cols="4"></v-col>

      </v-row>
    </v-container>
  </div> -->
  is logged in is {{ isLoggedIn }}
<v-container v-if="!isLoggedIn">
  <v-row class="pt-16">
    <v-col cols="4">

    </v-col>
    <v-col cols="4">
      <!-- create a vuetify 3 log in page -->
      <v-card class="w-full">
        <v-card-title>
          Log In
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="email"
              label="Email"
              outlined
              dense
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="Password"
              outlined
              dense
              type="password"
            ></v-text-field>
            <v-btn
              color="primary"
              :disabled="loading"
              @click="signIn()"
            >
              Log In
            </v-btn>
          </v-form>
        </v-card-text>
        <div v-if="loginUnsuccessful">
          <v-card-text color="red">
            Sign in unsuccessful. Please check your user credentials and try again.
          </v-card-text>
        </div>
        
        </v-card>
      
    </v-col>
    <v-col cols="4">
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
            email: '',
            password: '',
            loginUnsuccessful: false,
            store: null,
            loading: false,
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
        // for debugging purposes
        // return true;
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

          }
        } catch (err) {
          console.log("Sign in unsuccessful", err);
        } finally {
          this.loading = false;
        }
      },
      async initUser() {
        console.log('running init user upon mounted and calling the useFirebase function');
        await initUser();
        console.log('FROM APP VUE we are setting store authinitialized to TRUE')
        this.store.setAuthInitialized(true);
    },

    },
}
</script>