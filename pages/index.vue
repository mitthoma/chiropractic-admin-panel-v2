<template>
  <v-container fluid class="pa-6">
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 font-weight-bold mb-2">Dashboard</h1>
        <p class="text-body-1 text-medium-emphasis mb-6">
          Welcome to your practice management system
        </p>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card elevation="2" class="rounded-lg">
          <v-card-title class="text-h5 font-weight-bold pa-6 pb-4">
            Patient Selection
          </v-card-title>
          <v-card-text class="pa-6 pt-2">
            <p class="text-body-1 mb-4">
              Select a patient to view their records and begin documentation
            </p>
            <v-select
              v-model="selectedPatient"
              :items="fetchedPatients"
              :item-title="patientDisplayName"
              item-value="id"
              label="Select a patient"
              variant="outlined"
              density="comfortable"
              prepend-inner-icon="mdi-account-search"
            ></v-select>

            <div class="text-center mt-4">
              <p class="text-body-2 text-medium-emphasis mb-3">or</p>
              <v-btn
                color="primary"
                size="large"
                variant="outlined"
                prepend-icon="mdi-account-multiple"
                @click="goToPatients"
              >
                View All Patients
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Features & Benefits Section -->
    <v-row class="mt-8">
      <v-col cols="12">
        <div class="text-center mb-6">
          <h2 class="text-h4 font-weight-bold mb-3">
            Why Choose Chiropractic Admin?
          </h2>
          <p class="text-h6 text-medium-emphasis font-weight-regular">
            Streamline your practice with powerful, intuitive tools
          </p>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="4">
        <v-card elevation="2" class="rounded-lg pa-4 h-100">
          <div class="text-center">
            <v-avatar color="primary" size="80" class="mb-4">
              <v-icon
                icon="mdi-account-multiple"
                size="40"
                color="white"
              ></v-icon>
            </v-avatar>
            <h3 class="text-h6 font-weight-bold mb-3">Patient Management</h3>
            <p class="text-body-2 text-medium-emphasis">
              Comprehensive patient records with easy access to medical history,
              contact information, and treatment plans all in one place.
            </p>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card elevation="2" class="rounded-lg pa-4 h-100">
          <div class="text-center">
            <v-avatar color="success" size="80" class="mb-4">
              <v-icon
                icon="mdi-file-document-edit"
                size="40"
                color="white"
              ></v-icon>
            </v-avatar>
            <h3 class="text-h6 font-weight-bold mb-3">Treatment Notes</h3>
            <p class="text-body-2 text-medium-emphasis">
              Document treatments efficiently with structured note templates,
              ensuring thorough and compliant record-keeping for every visit.
            </p>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card elevation="2" class="rounded-lg pa-4 h-100">
          <div class="text-center">
            <v-avatar color="info" size="80" class="mb-4">
              <v-icon icon="mdi-chart-line" size="40" color="white"></v-icon>
            </v-avatar>
            <h3 class="text-h6 font-weight-bold mb-3">Reports & Analytics</h3>
            <p class="text-body-2 text-medium-emphasis">
              Generate detailed reports and track patient progress over time
              with comprehensive analytics and visual data representation.
            </p>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col cols="12" md="6">
        <v-card
          elevation="2"
          class="rounded-lg pa-4 h-100"
          color="primary"
          variant="tonal"
        >
          <div class="d-flex align-center">
            <v-icon
              icon="mdi-lightning-bolt"
              size="48"
              color="primary"
              class="mr-4"
            ></v-icon>
            <div>
              <h3 class="text-h6 font-weight-bold mb-2">Fast & Efficient</h3>
              <p class="text-body-2">
                Reduce administrative time by up to 40% with our streamlined
                workflows and quick-access features.
              </p>
            </div>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card
          elevation="2"
          class="rounded-lg pa-4 h-100"
          color="success"
          variant="tonal"
        >
          <div class="d-flex align-center">
            <v-icon
              icon="mdi-shield-check"
              size="48"
              color="success"
              class="mr-4"
            ></v-icon>
            <div>
              <h3 class="text-h6 font-weight-bold mb-2">Secure & Compliant</h3>
              <p class="text-body-2">
                HIPAA-compliant data storage with encrypted backups ensures your
                patient information stays safe and secure.
              </p>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-6">
      <v-col cols="12">
        <v-card elevation="3" class="rounded-lg" color="primary">
          <v-card-text class="pa-6 text-center">
            <h3 class="text-h5 font-weight-bold mb-3 text-white">
              Ready to Get Started?
            </h3>
            <p class="text-body-1 mb-4 text-white">
              Navigate to the Patients page to add your first patient or explore
              the demo data we've provided.
            </p>
            <v-btn
              size="large"
              color="white"
              variant="elevated"
              prepend-icon="mdi-account-plus"
              @click="goToPatients"
            >
              Manage Patients
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Guided Tour Component -->
    <GuidedTour v-model="showTour" @complete="onTourComplete" />
  </v-container>
</template>

<script>
import { createPatientService } from '~~/services/patient';
import { demoStore } from '~/store/demo';
import { userStore } from '~/store/user';

export default {
  name: 'DashboardPage',
  data() {
    return {
      patients: [],
      selectedPatient: null,
      patientService: null,
      showTour: false,
    };
  },
  computed: {
    fetchedPatients() {
      return this.patients.map((patient) => ({
        ...patient,
        displayName: this.patientDisplayName(patient),
      }));
    },
    isDemo() {
      const demo = demoStore();
      return demo.getIsDemo;
    },
  },
  watch: {
    selectedPatient(newValue) {
      if (newValue) {
        this.$router.push(`/patient/${newValue}`);
      }
    },
  },
  async mounted() {
    const demo = demoStore();
    const user = userStore();

    // Check if demo mode and show tour if not completed
    if (demo.getIsDemo && !demo.getTourCompleted) {
      setTimeout(() => {
        this.showTour = true;
      }, 500);
    }

    try {
      // Use demo patients if in demo mode, otherwise fetch from API
      if (demo.getIsDemo) {
        this.patients = demo.getPatients;
      } else {
        this.patientService = createPatientService(this.$api);
        this.patients = await this.patientService.getPatients();
      }
    } catch (error) {
      console.error('Error fetching patients:', error);
      // Handle error appropriately
    }
  },
  methods: {
    patientDisplayName(patient) {
      if (patient && patient.firstName && patient.lastName && patient.acctNo) {
        return `${patient.firstName} ${patient.lastName} - ${patient.acctNo}`;
      } else {
        return 'Unknown Patient';
      }
    },
    goToPatients() {
      this.$router.push('/patient');
    },
    onTourComplete() {
      this.showTour = false;
    },
  },
};
</script>
