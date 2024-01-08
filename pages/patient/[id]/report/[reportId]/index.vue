<template>
  <div>
    <v-container>
      <v-btn class="mb-4" @click="backToPatient">Back to Patient</v-btn>
      <v-row>
        <v-col cols="12" class="text-center"
          ><v-card-title class="flex flex-start"
            >INITIAL / PROGRESS / EXAMINATION REPORT</v-card-title
          ></v-col
        >
      </v-row>
      <v-row>
        <v-col cols="6">
          <Lumbar :report-id="$route.params.reportId" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Lumbar from '../../../../../components/report/Lumbar.vue';
import { createPatientService } from '~~/services/patient';
import { createMyoDermService } from '~~/services/myoDerm';
import { createReportService } from '~~/services/report';
import { createPostureService } from '~~/services/posture';
import { createOrthoService } from '~~/services/ortho';
import { createReflexesService } from '~~/services/reflexes';
import { createCervicalService } from '~~/services/cervical';

export default {
  name: 'PatientReport',
  components: {
    Lumbar,
  },
  data() {
    return {
      patientService: null,
      reportService: null,
      cervicalService: null,
      orthoService: null,
      postureService: null,
      reflexesService: null,
      myoDermService: null,
      currentPatient: null,
      currentReport: null,
      currentCervical: null,
      currentReflexes: null,
      currentOrthoSeated: null,
      currentOrthoSupine: null,
      currentOrthoStanding: null,
      currentOrthoProne: null,
      currentMyoDerm: null,
      currentPosture: null,
    };
  },
  async mounted() {
    // load services
    this.patientService = await createPatientService(this.$api);
    this.reportService = await createReportService(this.$api);
    this.myoDermService = await createMyoDermService(this.$api);
    this.postureService = await createPostureService(this.$api);
    this.reflexesService = await createReflexesService(this.$api);
    this.orthoService = await createOrthoService(this.$api);
    this.cervicalService = await createCervicalService(this.$api);

    // load patient from route
    const patientId = this.$route.params.id;
    this.currentPatient = await this.patientService.getPatient({
      id: patientId,
    });

    // load properties
    await this.getCurrentReportProperties();
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
  },
};
</script>

<style scoped></style>
