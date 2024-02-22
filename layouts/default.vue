<template>
  <div>
    <v-navigation-drawer v-model="drawer" theme="dark">
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
          <v-btn
            color="primary"
            block
            :theme="theme.global.name.value"
            @click="signOut()"
          >
            Logout
          </v-btn>
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

    <v-dialog v-model="showDialog" persistent max-width="500px">
      <v-card>
        <v-card-title class="text-h5">Session Timeout</v-card-title>
        <v-card-text>
          Due to inactivity, you will be logged out in {{ countdown }} seconds.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-main>
      <NuxtPage />
    </v-main>
  </div>
</template>

<script></script>

<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue';
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

const TIMEOUT_DURATION = 60000 * 5; // 5 minutes of inactivity
const TIMEOUT_WARNING_DURATION = 5000 * 4; // 20 seconds warning countdown
const showDialog = ref(false);
const countdown = ref(TIMEOUT_WARNING_DURATION / 1000);
const countdownInterval = ref(null);

const inactivityTimer = ref(null);

function resetTimer() {
  clearTimeout(inactivityTimer.value);
  clearInterval(countdownInterval.value);
  showDialog.value = false;
  inactivityTimer.value = setTimeout(() => {
    showDialog.value = true;
    startCountdown();
  }, TIMEOUT_DURATION - TIMEOUT_WARNING_DURATION);
}

function startCountdown() {
  countdown.value = TIMEOUT_WARNING_DURATION / 1000;
  clearInterval(countdownInterval.value);
  countdownInterval.value = setInterval(() => {
    countdown.value--;
    if (countdown.value <= 0) {
      clearInterval(countdownInterval.value);
      signOut();
    }
  }, 1000);
}

function onActivity() {
  if (store.getIsLoggedIn) {
    resetTimer();
  }
}

const signOut = async () => {
  await signOutUser();
  clearTimeout(inactivityTimer.value);
  clearInterval(countdownInterval.value);
};

onMounted(() => {
  document.addEventListener('mousemove', onActivity);
  document.addEventListener('keypress', onActivity);
  document.addEventListener('click', onActivity);

  resetTimer();
});

onUnmounted(() => {
  document.removeEventListener('mousemove', onActivity);
  document.removeEventListener('keypress', onActivity);
  document.removeEventListener('click', onActivity);

  clearTimeout(inactivityTimer.value);
});

watch(themeToggler, () => {
  theme.global.name.value = theme.global.current.value.dark
    ? 'customLight'
    : 'dark';
});
</script>

<style scoped>
.item {
  font-weight: 800;
  font-size: 16px;
}
</style>
