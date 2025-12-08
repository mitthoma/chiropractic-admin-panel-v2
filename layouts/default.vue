<template>
  <div>
    <v-navigation-drawer v-model="drawer" class="custom-drawer" :width="280">
      <div class="drawer-header pa-6">
        <v-avatar color="primary" size="48" class="mb-3">
          <v-icon icon="mdi-hospital-building" size="28" color="white"></v-icon>
        </v-avatar>
        <h2 class="text-h6 font-weight-bold">Chiropractic Admin</h2>
        <p class="text-caption text-medium-emphasis">Practice Management</p>
      </div>

      <v-divider></v-divider>

      <v-list density="comfortable" nav class="px-2 py-4">
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
          :title="item.title"
          :value="item.value"
          class="nav-item mb-1 rounded-lg"
          color="primary"
        >
          <template #prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>
        </v-list-item>
      </v-list>

      <template #append>
        <div class="pa-4">
          <v-btn
            color="error"
            variant="tonal"
            block
            size="large"
            :theme="theme.global.name.value"
            class="logout-btn"
            @click="signOut()"
          >
            <v-icon start icon="mdi-logout"></v-icon>
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar elevation="0" class="custom-app-bar">
      <v-app-bar-nav-icon
        class="ml-2"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <v-toolbar-title class="font-weight-bold text-h6">
        Chiropractic Admin
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-chip
        v-if="isDemoMode"
        color="success"
        variant="flat"
        size="small"
        prepend-icon="mdi-play-circle"
        class="font-weight-bold elevation-2 mr-4"
      >
        Demo Mode
      </v-chip>

      <v-switch
        v-model="themeToggler"
        hide-details
        density="compact"
        class="mr-4"
        color="primary"
      ></v-switch>

      <v-menu min-width="250px" rounded="lg" offset-y>
        <template #activator="{ props }">
          <v-btn icon v-bind="props" class="mr-2">
            <v-avatar color="primary" size="40">
              <span class="text-subtitle-1 font-weight-bold">{{
                user.initials
              }}</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-card class="pa-4" elevation="8">
          <v-card-text>
            <div class="mx-auto text-center">
              <v-avatar color="primary" size="64" class="mb-3">
                <span class="text-h5 font-weight-bold">{{
                  user.initials
                }}</span>
              </v-avatar>
              <h3 class="text-h6 font-weight-bold">
                {{ user.firstName }} {{ user.lastName }}
              </h3>
              <p class="text-caption text-medium-emphasis mt-1">
                {{ user.email }}
              </p>
              <v-chip size="small" color="primary" class="mt-2">
                Administrator
              </v-chip>
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
import { onMounted, onUnmounted, ref, watch, computed } from 'vue';
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

// Check if user is in demo mode
const isDemoMode = computed(() => {
  return store.user?.firebaseUid?.startsWith('demo-user-');
});
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

  // Reset demo mode on logout
  const { demoStore } = await import('~/store/demo');
  const demo = demoStore();
  demo.reset();
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
    : 'customDark';
});
</script>

<style scoped>
.nav-item {
  font-weight: 600;
  margin: 4px 0;
  transition: all 0.2s ease-in-out;
}

.nav-item:hover {
  transform: translateX(4px);
}

.logout-btn {
  font-weight: 600;
  text-transform: none;
  letter-spacing: normal;
}
</style>
