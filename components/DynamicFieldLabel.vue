<template>
  <div class="dynamic-field-wrapper">
    <div class="d-flex align-center mb-1">
      <span class="field-label">{{ label }}</span>
      <v-chip
        v-if="isDynamic"
        size="x-small"
        color="secondary"
        variant="flat"
        class="ml-2 dynamic-chip"
      >
        <v-icon start size="x-small">mdi-cog</v-icon>
        Dynamic
      </v-chip>
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
  isDynamic?: boolean;
}>();
</script>

<style scoped>
.dynamic-field-wrapper {
  margin-bottom: 8px;
}

.field-label {
  font-weight: 500;
  font-size: 0.875rem;
  color: rgba(var(--v-theme-on-surface), 0.7);
}

.dynamic-chip {
  font-size: 0.65rem !important;
  height: 18px !important;
  padding: 0 6px !important;
}

.dynamic-chip .v-icon {
  margin-right: 2px;
}
</style>
