<template>
  <v-alert
    v-if="show"
    :type="type"
    variant="tonal"
    prominent
    border="start"
    class="demo-notice"
  >
    <v-row align="center">
      <v-col cols="12" md="8">
        <div class="d-flex align-center">
          <v-icon :icon="icon" size="32" class="mr-3"></v-icon>
          <div>
            <div class="text-h6 font-weight-bold mb-1">{{ title }}</div>
            <div class="text-body-2">{{ message }}</div>
          </div>
        </div>
      </v-col>
      <v-col cols="12" md="4" class="text-right">
        <v-btn
          :color="buttonColor"
          variant="elevated"
          size="large"
          prepend-icon="mdi-web"
          href="https://mitchell-codes.com"
          target="_blank"
        >
          Get a Quote
        </v-btn>
      </v-col>
    </v-row>
  </v-alert>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    show?: boolean;
    title?: string;
    message?: string;
    type?: 'info' | 'warning' | 'error' | 'success';
    icon?: string;
    buttonColor?: string;
  }>(),
  {
    show: true,
    title: 'Demo Mode Active',
    message:
      'Adding new records is disabled in demo mode. Contact us for a quote to get full access to the system with your own database.',
    type: 'info',
    icon: 'mdi-information',
    buttonColor: 'primary',
  }
);
</script>

<style scoped>
.demo-notice {
  margin-bottom: 16px;
}
</style>
