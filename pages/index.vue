<template>
  <v-container>
    <v-row>
      <v-col cols="3"></v-col>

      <v-col cols="6">
        <v-card class="text-center">
          <v-card-title>Notes Dashboard</v-card-title>
        </v-card>
      </v-col>
      <v-col cols="3"></v-col>

      <v-col cols="3"></v-col>
      <v-col cols="6">
        <v-card>
          <v-card-text class="text-center">
            <h3 class="my-5">Please select a patient to get started</h3>
            <v-select
              v-model="selectedPatient"
              :items="fetchedPatients"
              :item-title="patientDisplayName"
              item-value="id"
              label="Select a patient"
            ></v-select>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="3"></v-col>
    </v-row>
  </v-container>
</template>

<script>
import { createPatientService } from '~~/services/patient';

export default {
  name: 'DashboardPage',
  data() {
    return {
      patients: [],
      selectedPatient: null,
      patientService: null,
    };
  },
  computed: {
    fetchedPatients() {
      return this.patients.map((patient) => ({
        ...patient,
        displayName: this.patientDisplayName(patient),
      }));
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
    try {
      this.patientService = createPatientService(this.$api);
      this.patients = await this.patientService.getPatients();
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
        return 'Unknown Patient'; // Or handle this case as appropriate
      }
    },
  },
};
</script>
