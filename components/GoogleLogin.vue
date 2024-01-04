<template>
  <v-btn color="primary" :disabled="loading" @click="loginWithGoogle()">
    Log in with Google
  </v-btn>
</template>
<script>
export default {
  methods: {
    async loginWithGoogle() {
      this.loading = true;
      try {
        const result = await this.$auth.loginWith("google");
        if (result.error) {
          console.log("Google login unsuccessful", result.error);
        } else {
          this.$router.push("/");
        }
      } catch (err) {
        console.log("Google login error", err);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
