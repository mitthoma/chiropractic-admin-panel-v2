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
          <v-card color="secondary" variant="flat" class="pa-6 rounded-lg">
            <div class="d-flex align-center">
              <v-icon
                icon="mdi-clipboard-text"
                size="48"
                class="mr-4"
                color="white"
              ></v-icon>
              <div>
                <h1 class="text-h4 font-weight-bold text-white mb-1">
                  Examination Report
                </h1>
                <p class="text-body-1 text-white" style="opacity: 0.9">
                  {{ currentPatient?.firstName }}
                  {{ currentPatient?.lastName }} - Exam:
                  {{ formatExamDate(currentReport?.exam_date) }}
                </p>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <GeneralInfo :patient="currentPatient" :report="currentReport" />
      <Vitals :patient="currentPatient" :report="currentReport" />
      <v-row>
        <v-col cols="12">
          <Posture :report-id="$route.params.reportId" />
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
  },
  data() {
    return {
      patientService: null,
      reportService: null,
      patient: null,
      currentReport: null,
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
      const reportId = this.$route.params.reportId;

      this.currentPatient = demo.getPatients.find((p) => p.id === patientId);
      this.currentReport = demo.getReports.find((r) => r.id === reportId);
    } else {
      this.patientService = await createPatientService(this.$api);
      this.reportService = await createReportService(this.$api);
      this.currentPatient = await this.patientService.getPatient({
        id: this.$route.params.id,
      });
      this.currentReport = await this.reportService.getReport({
        reportId: this.$route.params.reportId,
      });
    }
  },
  methods: {
    async getCurrentReportProperties() {
      this.currentReport = await this.reportService.getReport({
        id: this.$route.params.reportId,
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
