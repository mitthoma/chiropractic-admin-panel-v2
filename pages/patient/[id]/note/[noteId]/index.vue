<!-- this is the new and refactored notes page -->

<template>
  <div>
    <v-container fluid class="pa-6">
      <v-btn
        variant="text"
        prepend-icon="mdi-chevron-left"
        class="mb-4"
        @click="backToPatient"
      >
        Back to Patient
      </v-btn>

      <!-- Header -->
      <v-row class="mb-4">
        <v-col cols="12">
          <v-card color="primary" variant="flat" class="pa-6 rounded-lg">
            <div class="d-flex align-center">
              <v-icon
                icon="mdi-file-document-edit"
                size="48"
                class="mr-4"
                color="white"
              ></v-icon>
              <div>
                <h1 class="text-h4 font-weight-bold text-white mb-1">
                  Treatment Note
                </h1>
                <p class="text-body-1 text-white" style="opacity: 0.9">
                  {{ patient?.firstName }} {{ patient?.lastName }} - Visit:
                  {{ formatVisitDate(currentNote?.visitDate) }}
                </p>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <GeneralInfo />
        </v-col>
        <v-col cols="6">
          <Vitals />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="8">
          <SubjectiveComplaints />
        </v-col>
        <v-col cols="4">
          <DoctorNote :note="currentNote" @refresh="getCurrentProperties" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <SpinalEntries />
        </v-col>
        <v-col cols="12">
          <ExtremityEntries />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <SpinalTreatments />
        </v-col>
        <v-col cols="12"><ExtremityTreatments /></v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import GeneralInfo from '~~/components/note/GeneralInfo.vue';
import Vitals from '~~/components/note/Vitals.vue';
import { createPatientService } from '~~/services/patient';
import { createReportService } from '~~/services/report';
import { createNoteService } from '~~/services/note';
import { createEntryService } from '~~/services/entry';
import SpinalEntries from '~~/components/note/SpinalEntries.vue';
import ExtremityEntries from '~~/components/note/ExtremityEntries.vue';
import SpinalTreatments from '~~/components/note/SpinalTreatments.vue';
import ExtremityTreatments from '~~/components/note/ExtremityTreatments.vue';
import SubjectiveComplaints from '~~/components/note/SubjectiveComplaints.vue';
import DoctorNote from '~~/components/note/DoctorNote.vue';

export default {
  name: 'PatientReport',
  components: {
    GeneralInfo,
    Vitals,
    SpinalEntries,
    ExtremityEntries,
    SpinalTreatments,
    ExtremityTreatments,
    SubjectiveComplaints,
    DoctorNote,
  },
  data() {
    return {
      patientService: null,
      reportService: null,
      noteService: null,
      patient: null,
      currentNote: null,
    };
  },
  computed: {
    currentPatient() {
      return this.patient;
    },
  },
  async mounted() {
    // Check if in demo mode
    const { demoStore } = await import('~/store/demo');
    const demo = demoStore();

    if (demo.getIsDemo) {
      // Load demo data
      const patientId = parseInt(this.$route.params.id);
      const noteId = this.$route.params.noteId;

      this.patient = demo.getPatients.find((p) => p.id === patientId);
      this.currentNote = demo.getNotes.find((n) => n.id === noteId);
    } else {
      // load services
      this.patientService = await createPatientService(this.$api);
      this.reportService = await createReportService(this.$api);
      this.noteService = await createNoteService(this.$api);
      this.entryService = await createEntryService(this.$api);

      // load the current note and patient
      this.patient = await this.patientService.getPatient({
        id: this.$route.params.id,
      });
      this.currentNote = await this.noteService.getNote({
        noteId: this.$route.params.noteId,
      });
    }
  },
  methods: {
    async refresh() {},
    async getCurrentProperties() {
      const { demoStore } = await import('~/store/demo');
      const demo = demoStore();

      if (demo.getIsDemo) {
        const patientId = parseInt(this.$route.params.id);
        const noteId = this.$route.params.noteId;
        this.patient = demo.getPatients.find((p) => p.id === patientId);
        this.currentNote = demo.getNotes.find((n) => n.id === noteId);
      } else {
        if (!this.patientService) {
          return;
        }
        this.currentNote = await this.noteService.getNote({
          id: this.$route.params.noteId,
        });
        this.patient = await this.patientService.getPatient({
          id: this.$route.params.id,
        });
      }
    },

    backToPatient() {
      this.$router.push(`/patient/${this.$route.params.id}`);
    },
    formatVisitDate(date) {
      if (!date) return 'N/A';
      return new Date(date).toLocaleDateString();
    },
    formatExamDate(date) {
      return date ? new Date(date).toLocaleDateString() : 'N/A';
    },
    formatHeight(feet, inches) {
      return `${feet}' ${inches}"` || 'N/A';
    },
  },
};
</script>

<style scoped>
.posture-option {
  display: flex;
  align-items: center;
}
.posture-option label {
  margin-right: 10px;
}
.posture-option div {
  margin-right: 10px;
  cursor: pointer;
  padding: 5px;
}
.posture-option .active {
  font-weight: bold;
  background-color: lightgray;
}
.posture-option .inactive {
  opacity: 0.6;
}
</style>
