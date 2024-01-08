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
  },
  data() {
    return {
      patientService: null,
      reportService: null,
      currentPatient: null,
      currentReport: null,
    };
  },
  async mounted() {
    // load services
    this.patientService = await createPatientService(this.$api);
    this.reportService = await createReportService(this.$api);

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
