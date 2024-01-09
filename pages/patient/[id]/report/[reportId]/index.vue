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
      <GeneralInfo :patient="currentPatient" :report="currentReport" />
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title class="text-h5 pb-5">Vitals</v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" sm="4">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Height</v-list-item-title>
                      <v-list-item-subtitle>{{
                        formatHeight(
                          currentPatient?.heightFeet,
                          currentPatient?.heightInches
                        )
                      }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Weight</v-list-item-title>
                      <v-list-item-subtitle
                        >{{ currentPatient?.weight }} lbs</v-list-item-subtitle
                      >
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Systolic</v-list-item-title>
                      <v-list-item-subtitle>{{
                        currentReport?.sys
                      }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="4">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Diastolic</v-list-item-title>
                      <v-list-item-subtitle>{{
                        currentReport?.dia
                      }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Pulse</v-list-item-title>
                      <v-list-item-subtitle>{{
                        currentReport?.pulse
                      }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Temperature</v-list-item-title>
                      <v-list-item-subtitle
                        >{{ currentReport?.temp }} °F</v-list-item-subtitle
                      >
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="4">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Respiration</v-list-item-title>
                      <v-list-item-subtitle>{{
                        currentReport?.resp
                      }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title class="text-h5">
              Posture
              <v-icon v-if="!editablePosture" @click="editablePosture = true"
                >mdi-pencil</v-icon
              >
              <v-icon v-if="editablePosture" @click="savePosture"
                >mdi-check</v-icon
              >
              <v-icon v-if="editablePosture" @click="cancelEdit"
                >mdi-cancel</v-icon
              >
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <div class="posture-option">
                      <label>Gait:</label>
                      <div
                        :class="{
                          active: currentPosture.gait === 'impaired',
                          inactive: currentPosture.gait !== 'impaired',
                        }"
                        @click="setPosture('gait', 'impaired')"
                      >
                        Impaired
                      </div>
                      <div
                        :class="{
                          active: currentPosture.gait === 'normal',
                          inactive: currentPosture.gait !== 'normal',
                        }"
                        @click="setPosture('gait', 'normal')"
                      >
                        Normal
                      </div>
                      <div
                        :class="{
                          active: currentPosture.gait === 'abnormal',
                          inactive: currentPosture.gait !== 'abnormal',
                        }"
                        @click="setPosture('gait', 'abnormal')"
                      >
                        Abnormal
                      </div>
                    </div>
                  </v-col>
                  <!-- Repeat for other posture attributes ... -->
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="text-center" cols="12">
          <v-card>
            <v-card-title>Posture</v-card-title>
          </v-card>
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
  },
  data() {
    return {
      patientService: null,
      reportService: null,
      patient: null,
      currentReport: null,
      editablePosture: false,
      currentPosture: {
        gait: null,
        // ... other posture attributes ...
      },
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

    // load patient from route
    const patientId = this.$route.params.id;
    this.patient = await this.patientService.getPatient({
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
    setPosture(attribute, value) {
      if (this.editablePosture) {
        this.currentPosture[attribute] = value;
      }
    },
    savePosture() {
      // Save logic here...
      this.editablePosture = false;
    },
    cancelEdit() {
      // Reset to initial values or fetch again...
      this.editablePosture = false;
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
