<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer">
      <v-list-item class="my-5" title="Pynkerton Chiropractic"></v-list-item>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
          :title="item.title"
          :value="item.value"
          :prepend-icon="item.icon"
          class="dashboard-item item"
        ></v-list-item>
      </v-list>

      <template #append>
        <div class="pa-2">
          <v-btn color="primary" block @click="signOut()"> Logout </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Pynkerton Chiropractic</v-toolbar-title>
      <v-switch
        v-model="themeToggler"
        class="d-flex justify-end mr-4"
      ></v-switch>
      <v-menu min-width="200px" rounded>
        <template #activator="{ props }">
          <v-btn icon v-bind="props" class="mx-16">
            <v-avatar color="brown" size="large">
              <span class="text-h5">{{ user.initials }}</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-card class="pa-5">
          <v-card-text>
            <div class="mx-auto text-center">
              <v-avatar color="brown" class="w-full">
                <span class="text-h5">{{ user.initials }}</span>
              </v-avatar>
              <h3>{{ user.firstName }}</h3>
              <p class="text-caption mt-1">
                {{ user.email }}
              </p>
            </div>
          </v-card-text>
        </v-card>
      </v-menu>
    </v-app-bar>

    <v-main>
      <NuxtPage />
    </v-main>
  </v-app>
</template>

<script></script>

<script setup>
import { ref, watch } from 'vue';
import { useTheme } from 'vuetify';
import { userStore } from '~/store/user';

const store = userStore();
const theme = useTheme();
const drawer = ref(null);
const themeToggler = ref(false);
const initials =
  store.user?.firstName && store.user?.lastName
    ? store.user?.firstName[0]?.toUpperCase() +
      store.user?.lastName[0]?.toUpperCase()
    : '';
const user = {
  firstName: store.user?.firstName,
  lastName: store.user?.lastName,
  email: store.user?.email,
  initials: store.user ? initials : '',
};
const items = [
  {
    icon: 'mdi-apps',
    title: 'Dashboard',
    to: '/',
  },
  {
    icon: 'mdi-account-injury',
    title: 'Patients',
    to: '/patient',
  },
  {
    icon: 'mdi-account-group',
    title: 'Users',
    to: '/user',
  },
  {
    icon: 'mdi-cog',
    title: 'Settings',
    to: '/settings',
  },
];

// create method signoutuser that sets the isloggedin in user store to be false
const signOut = async () => {
  await signOutUser();
};
watch(themeToggler, () => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
});
</script>

<script>
// Define component options here
export default {
  name: 'DefaultLayout',
  // Other options like methods, computed properties, etc.
};
</script>

<style scoped>
.item {
  font-weight: 800;
  font-size: 16px;
}
</style>
