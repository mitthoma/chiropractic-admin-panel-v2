<template>
  <v-dialog v-model="dialog" persistent max-width="700px" class="tour-dialog">
    <v-card class="rounded-xl">
      <v-card-title
        class="text-h5 font-weight-bold pa-6 pb-4 d-flex align-center"
      >
        <v-icon
          icon="mdi-map-marker-path"
          color="primary"
          size="32"
          class="mr-3"
        ></v-icon>
        <span>Welcome to Your Demo Tour!</span>
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text class="pa-6">
        <!-- Progress indicator -->
        <v-progress-linear
          v-model="progress"
          color="primary"
          height="6"
          rounded
          class="mb-6"
        ></v-progress-linear>

        <div class="tour-content">
          <!-- Step 1: Welcome -->
          <div v-if="currentStep === 0" class="tour-step">
            <div class="text-center mb-4">
              <v-icon icon="mdi-hand-wave" color="primary" size="64"></v-icon>
            </div>
            <h2 class="text-h5 font-weight-bold mb-3">
              Welcome to Chiropractic Admin!
            </h2>
            <p class="text-body-1 mb-4">
              This interactive tour will guide you through the key features of
              our practice management system.
            </p>
            <v-list
              density="compact"
              class="bg-surface-variant rounded-lg pa-3"
            >
              <v-list-item prepend-icon="mdi-check-circle" class="px-2">
                <v-list-item-title>Manage patient records</v-list-item-title>
              </v-list-item>
              <v-list-item prepend-icon="mdi-check-circle" class="px-2">
                <v-list-item-title>Track treatment notes</v-list-item-title>
              </v-list-item>
              <v-list-item prepend-icon="mdi-check-circle" class="px-2">
                <v-list-item-title>Generate reports</v-list-item-title>
              </v-list-item>
              <v-list-item prepend-icon="mdi-check-circle" class="px-2">
                <v-list-item-title>Streamline your practice</v-list-item-title>
              </v-list-item>
            </v-list>
          </div>

          <!-- Step 2: Patient Management -->
          <div v-if="currentStep === 1" class="tour-step">
            <div class="text-center mb-4">
              <v-icon
                icon="mdi-account-multiple"
                color="primary"
                size="64"
              ></v-icon>
            </div>
            <h2 class="text-h5 font-weight-bold mb-3">Patient Management</h2>
            <p class="text-body-1 mb-4">
              The heart of your practice starts with patient records. We've
              pre-loaded 5 complete patient profiles with realistic data.
            </p>
            <v-card variant="outlined" class="mb-4">
              <v-card-text>
                <p class="text-subtitle-1 font-weight-bold mb-2">
                  <v-icon
                    icon="mdi-database"
                    color="success"
                    size="small"
                    class="mr-1"
                  ></v-icon>
                  Sample Data Included:
                </p>
                <ul class="ml-4">
                  <li>
                    <strong>5 Patients</strong> - Complete demographics &
                    contact info
                  </li>
                  <li>
                    <strong>8 Complaints</strong> - Patient-reported issues &
                    pain levels
                  </li>
                  <li>
                    <strong>5 Treatment Notes</strong> - Documented visits with
                    vitals
                  </li>
                  <li>
                    <strong>3 Exam Reports</strong> - Comprehensive assessments
                  </li>
                  <li>
                    <strong>Settings Data</strong> - Rooms & treatment options
                    configured
                  </li>
                </ul>
              </v-card-text>
            </v-card>
            <v-alert type="success" variant="tonal" density="compact">
              <div class="text-body-2">
                All data is interconnected - click on any patient to see their
                full history!
              </div>
            </v-alert>
          </div>

          <!-- Step 3: Adding Patients -->
          <div v-if="currentStep === 2" class="tour-step">
            <div class="text-center mb-4">
              <v-icon
                icon="mdi-account-plus"
                color="primary"
                size="64"
              ></v-icon>
            </div>
            <h2 class="text-h5 font-weight-bold mb-3">How to Add a Patient</h2>
            <p class="text-body-1 mb-4">
              Adding a new patient is simple and takes just a few seconds:
            </p>
            <v-timeline density="compact" side="end" class="mb-4">
              <v-timeline-item dot-color="primary" size="small">
                <div class="mb-2">
                  <strong>Step 1:</strong> Navigate to the
                  <strong>Patients</strong> page from the sidebar
                </div>
              </v-timeline-item>
              <v-timeline-item dot-color="primary" size="small">
                <div class="mb-2">
                  <strong>Step 2:</strong> Click the
                  <strong>"Add New Patient"</strong> button
                </div>
              </v-timeline-item>
              <v-timeline-item dot-color="primary" size="small">
                <div class="mb-2">
                  <strong>Step 3:</strong> Fill in patient details (name,
                  contact info, etc.)
                </div>
              </v-timeline-item>
              <v-timeline-item dot-color="primary" size="small">
                <div>
                  <strong>Step 4:</strong> Save and start documenting care!
                </div>
              </v-timeline-item>
            </v-timeline>
          </div>

          <!-- Step 4: Navigation -->
          <div v-if="currentStep === 3" class="tour-step">
            <div class="text-center mb-4">
              <v-icon icon="mdi-map" color="primary" size="64"></v-icon>
            </div>
            <h2 class="text-h5 font-weight-bold mb-3">Navigating the System</h2>
            <p class="text-body-1 mb-4">
              Use the sidebar menu to access all features:
            </p>
            <v-row>
              <v-col cols="6">
                <v-card variant="outlined" class="pa-3 text-center">
                  <v-icon
                    icon="mdi-apps"
                    color="primary"
                    size="40"
                    class="mb-2"
                  ></v-icon>
                  <div class="font-weight-bold">Dashboard</div>
                  <div class="text-caption">Quick patient access</div>
                </v-card>
              </v-col>
              <v-col cols="6">
                <v-card variant="outlined" class="pa-3 text-center">
                  <v-icon
                    icon="mdi-account-injury"
                    color="primary"
                    size="40"
                    class="mb-2"
                  ></v-icon>
                  <div class="font-weight-bold">Patients</div>
                  <div class="text-caption">Manage records</div>
                </v-card>
              </v-col>
              <v-col cols="6">
                <v-card variant="outlined" class="pa-3 text-center">
                  <v-icon
                    icon="mdi-account-group"
                    color="primary"
                    size="40"
                    class="mb-2"
                  ></v-icon>
                  <div class="font-weight-bold">Users</div>
                  <div class="text-caption">Staff management</div>
                </v-card>
              </v-col>
              <v-col cols="6">
                <v-card variant="outlined" class="pa-3 text-center">
                  <v-icon
                    icon="mdi-cog"
                    color="primary"
                    size="40"
                    class="mb-2"
                  ></v-icon>
                  <div class="font-weight-bold">Settings</div>
                  <div class="text-caption">Configure system</div>
                </v-card>
              </v-col>
            </v-row>
          </div>

          <!-- Step 5: Ready to Go -->
          <div v-if="currentStep === 4" class="tour-step">
            <div class="text-center mb-4">
              <v-icon
                icon="mdi-rocket-launch"
                color="success"
                size="64"
              ></v-icon>
            </div>
            <h2 class="text-h5 font-weight-bold mb-3">You're All Set!</h2>
            <p class="text-body-1 mb-4">
              You're ready to explore the demo. Remember:
            </p>
            <v-alert type="info" variant="tonal" class="mb-4">
              <div class="text-body-2 mb-2">
                <v-icon
                  icon="mdi-information"
                  size="small"
                  class="mr-1"
                ></v-icon>
                <strong>Demo Mode Limitations:</strong>
              </div>
              <ul class="ml-6">
                <li>Adding new records is disabled (forms are view-only)</li>
                <li>Editing and viewing existing data works fully</li>
                <li>All demo data resets when you log out</li>
              </ul>
            </v-alert>
            <v-list
              density="compact"
              class="bg-surface-variant rounded-lg pa-3"
            >
              <v-list-item
                prepend-icon="mdi-check-circle"
                color="success"
                class="px-2"
              >
                <v-list-item-title
                  >Click on a patient to view their full
                  history</v-list-item-title
                >
              </v-list-item>
              <v-list-item
                prepend-icon="mdi-check-circle"
                color="success"
                class="px-2"
              >
                <v-list-item-title
                  >Explore treatment notes and exam reports</v-list-item-title
                >
              </v-list-item>
              <v-list-item
                prepend-icon="mdi-check-circle"
                color="success"
                class="px-2"
              >
                <v-list-item-title
                  >Check out settings and treatment options</v-list-item-title
                >
              </v-list-item>
            </v-list>
          </div>
        </div>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="pa-6 pt-4">
        <div class="text-caption text-medium-emphasis">
          Step {{ currentStep + 1 }} of {{ totalSteps }}
        </div>
        <v-spacer></v-spacer>
        <v-btn v-if="currentStep > 0" variant="text" @click="previousStep">
          <v-icon start icon="mdi-chevron-left"></v-icon>
          Back
        </v-btn>
        <v-btn
          v-if="currentStep < totalSteps - 1"
          color="primary"
          variant="elevated"
          @click="nextStep"
        >
          Next
          <v-icon end icon="mdi-chevron-right"></v-icon>
        </v-btn>
        <v-btn
          v-else
          color="success"
          variant="elevated"
          size="large"
          @click="completeTour"
        >
          Start Exploring
          <v-icon end icon="mdi-rocket-launch"></v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { demoStore } from '~/store/demo';

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'complete'): void;
}>();

const demo = demoStore();
const dialog = ref(props.modelValue);
const currentStep = ref(0);
const totalSteps = 5;

const progress = computed(() => {
  return ((currentStep.value + 1) / totalSteps) * 100;
});

watch(
  () => props.modelValue,
  (newVal) => {
    dialog.value = newVal;
  }
);

watch(dialog, (newVal) => {
  emit('update:modelValue', newVal);
});

const nextStep = () => {
  if (currentStep.value < totalSteps - 1) {
    currentStep.value++;
  }
};

const previousStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--;
  }
};

const completeTour = () => {
  demo.setTourCompleted(true);
  emit('complete');
  dialog.value = false;
};
</script>

<style scoped>
.tour-dialog .v-card {
  overflow: visible;
}

.tour-content {
  min-height: 400px;
}

.tour-step {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.v-timeline {
  padding-left: 0;
}
</style>
