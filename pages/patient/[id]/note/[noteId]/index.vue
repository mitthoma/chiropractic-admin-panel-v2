<!-- this is the new and refactored notes page -->

<template>
  <div>
    <v-container>
      <v-btn
        variant="text"
        prepend-icon="mdi-chevron-left"
        class="mb-4 text-primary font-weight-bold"
        @click="backToPatient"
        >Back to Patient</v-btn
      >
      <v-row>
        <v-col cols="12" class="text-center"
          ><v-card-title class="flex flex-start"
            >NOTE REPORT</v-card-title
          ></v-col
        >
      </v-row>
      <GeneralInfo :patient="currentPatient" :report="currentReport" />
      <Vitals :patient="currentPatient" :report="currentReport" />
      <v-row>
        <v-col cols="12">
          <Posture :report-id="$route.params.reportId" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="10">
          <!-- <Posture :report-id="$route.params.reportId" /> -->
          <SpinalGrid :entries="spinalEntries" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <Lumbar :report-id="$route.params.reportId" />
        </v-col>
        <v-col cols="6">
          <Reflexes :report-id="$route.params.reportId" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <OrthoStanding :report-id="$route.params.reportId" />
        </v-col>
        <v-col cols="6">
          <OrthoSeated :report-id="$route.params.reportId" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <Cervical :report-id="$route.params.reportId" />
        </v-col>
        <v-col cols="6">
          <OrthoSupine :report-id="$route.params.reportId" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <MyoDerm :report-id="$route.params.reportId" />
        </v-col>
        <v-col cols="6">
          <OrthoProne :report-id="$route.params.reportId" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Lumbar from '~~/components/report/Lumbar.vue';
import OrthoStanding from '~~/components/report/OrthoStanding.vue';
import OrthoSeated from '~~/components/report/OrthoSeated.vue';
import OrthoSupine from '~~/components/report/OrthoSupine.vue';
import OrthoProne from '~~/components/report/OrthoProne.vue';
import Cervical from '~~/components/report/Cervical.vue';
import MyoDerm from '~~/components/report/MyoDerm.vue';
import Reflexes from '~~/components/report/Reflexes.vue';
import GeneralInfo from '~~/components/report/GeneralInfo.vue';
import Vitals from '~~/components/report/Vitals.vue';
import Posture from '~~/components/report/Posture.vue';
import { createPatientService } from '~~/services/patient';
import { createReportService } from '~~/services/report';
import { createNoteService } from '~~/services/note';
import { createEntryService } from '~~/services/entry';
import SpinalGrid from '~~/components/grids/SpinalGrid.vue';

export default {
  name: 'PatientReport',
  components: {
    Lumbar,
    OrthoStanding,
    OrthoSeated,
    OrthoSupine,
    OrthoProne,
    Cervical,
    MyoDerm,
    Reflexes,
    GeneralInfo,
    Vitals,
    Posture,
    SpinalGrid,
  },
  data() {
    return {
      patientService: null,
      reportService: null,
      noteService: null,
      patient: null,
      currentNote: null,
      spinalEntries: [],
    };
  },
  computed: {
    currentPatient() {
      return this.patient;
    },
  },
  async mounted() {
    // load services
    this.patientService = await createPatientService(this.$api);
    this.reportService = await createReportService(this.$api);
    this.noteService = await createNoteService(this.$api);
    this.entryService = await createEntryService(this.$api);

    // load patient from route
    const patientId = this.$route.params.id;
    this.patient = await this.patientService.getPatient({
      id: patientId,
    });

    // load properties
    await this.getCurrentNoteProperties();
  },
  methods: {
    async getCurrentNoteProperties() {
      this.currentNote = await this.noteService.getNote({
        id: this.$route.params.noteId,
      });

      // retrieve spinal entries for the retrieved note
      this.spinalEntries = await this.entryService.getEntriesForNote({
        noteId: this.currentNote.id,
      });
    },

    backToPatient() {
      this.$router.push(`/patient/${this.$route.params.id}`);
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
  background-color: lightgray; /* or any color that matches your theme */
}
.posture-option .inactive {
  opacity: 0.6;
}
</style>
