import { defineStore } from 'pinia';
import { patient } from '@prisma/client';

interface PatientState {
  currentPatient: patient;
}

export const patientStore = defineStore('patient', {
  state: () => ({
    currentPatient: {} as patient,
  }),

  getters: {
    // getCurrentPatient: (state) => state.currentPatient,
    getCurrentPatient: (state: PatientState): patient | null =>
      Object.keys(state.currentPatient).length > 0
        ? state.currentPatient
        : null,
  },
  actions: {
    setCurrentPatient(patient: patient) {
      this.currentPatient = patient;
    },
  },
});
