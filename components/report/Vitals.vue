<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-card>
          <div class="card-header">
            <v-card-title class="text-h5 pb-5">Vitals</v-card-title>
            <div class="icon-container">
              <v-icon v-if="!editMode" @click="editMode = true"
                >mdi-pencil</v-icon
              >
              <div v-if="editMode">
                <v-icon @click="handleCancel">mdi-trash-can</v-icon>
                <v-icon @click="handleSave">mdi-check</v-icon>
              </div>
            </div>
          </div>
          <v-card-text>
            <v-row>
              <!-- Height -->
              <v-col cols="12" sm="4">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Height</v-list-item-title>
                    <v-list-item-subtitle v-if="!editMode">{{
                      formatHeight(heightFeet, heightInches)
                    }}</v-list-item-subtitle>
                    <div v-if="editMode">
                      <v-text-field
                        v-model="heightFeet"
                        label="Feet"
                        type="number"
                      ></v-text-field>
                      <v-text-field
                        v-model="heightInches"
                        label="Inches"
                        type="number"
                      ></v-text-field>
                    </div>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <!-- Weight -->
              <v-col cols="12" sm="4">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Weight</v-list-item-title>
                    <v-list-item-subtitle v-if="!editMode"
                      >{{ weight }} lbs</v-list-item-subtitle
                    >
                    <v-text-field
                      v-if="editMode"
                      v-model="weight"
                      label="Weight (lbs)"
                      type="number"
                    ></v-text-field>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <!-- Systolic -->
              <v-col cols="12" sm="4">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Systolic</v-list-item-title>
                    <v-list-item-subtitle v-if="!editMode">{{
                      systolic
                    }}</v-list-item-subtitle>
                    <v-text-field
                      v-if="editMode"
                      v-model="systolic"
                      label="Systolic"
                      type="number"
                    ></v-text-field>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
            <v-row>
              <!-- Diastolic -->
              <v-col cols="12" sm="4">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Diastolic</v-list-item-title>
                    <v-list-item-subtitle v-if="!editMode">{{
                      diastolic
                    }}</v-list-item-subtitle>
                    <v-text-field
                      v-if="editMode"
                      v-model="diastolic"
                      label="Diastolic"
                      type="number"
                    ></v-text-field>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <!-- Pulse -->
              <v-col cols="12" sm="4">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Pulse</v-list-item-title>
                    <v-list-item-subtitle v-if="!editMode">{{
                      pulse
                    }}</v-list-item-subtitle>
                    <v-text-field
                      v-if="editMode"
                      v-model="pulse"
                      label="Pulse"
                      type="number"
                    ></v-text-field>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <!-- Temperature -->
              <v-col cols="12" sm="4">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Temperature</v-list-item-title>
                    <v-list-item-subtitle v-if="!editMode"
                      >{{ temperature }} °F</v-list-item-subtitle
                    >
                    <v-text-field
                      v-if="editMode"
                      v-model="temperature"
                      label="Temperature (°F)"
                      type="number"
                    ></v-text-field>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
            <v-row>
              <!-- Respiration -->
              <v-col cols="12" sm="4">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Respiration</v-list-item-title>
                    <v-list-item-subtitle v-if="!editMode">{{
                      respiration
                    }}</v-list-item-subtitle>
                    <v-text-field
                      v-if="editMode"
                      v-model="respiration"
                      label="Respiration"
                      type="number"
                    ></v-text-field>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { createReportService } from '~~/services/report';
import { createPatientService } from '~~/services/patient';

export default {
  name: 'VitalsInfo',
  props: {
    patient: {
      default: null,
      required: true,
      type: Object,
    },
    report: {
      default: null,
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      reportService: null,
      patientService: null,
      editMode: false,
      heightFeet: this.patient?.heightFeet,
      heightInches: this.patient?.heightInches,
      weight: this.patient?.weight,
      systolic: this.report?.sys,
      diastolic: this.report?.dia,
      pulse: this.report?.pulse,
      temperature: this.report?.temp,
      respiration: this.report?.resp,
    };
  },
  mounted() {
    this.reportService = createReportService(this.$api);
    this.patientService = createPatientService(this.$api);
  },
  methods: {
    formatHeight(feet, inches) {
      if (feet && inches) {
        return `${feet}' ${inches}"`;
      } else {
        return 'None';
      }
    },
    async handleSave() {
      const patientPayload = {
        ...this.patient,
        heightFeet: this.heightFeet,
        heightInches: this.heightInches,
        weight: this.weight,
        id: this.patient.id,
      };
      const reportPayload = {
        ...this.report,
        sys: this.systolic,
        dia: this.diastolic,
        pulse: this.pulse,
        temp: this.temperature,
        resp: this.respiration,
        id: this.report.id,
      };
      await this.reportService.updateReport(reportPayload);
      await this.patientService.updatePatient(patientPayload);
      this.editMode = false;
    },
    handleCancel() {
      this.editMode = false;
      this.resetVitals();
    },
    resetVitals() {
      this.heightFeet = this.patient?.heightFeet;
      this.heightInches = this.patient?.heightInches;
      this.weight = this.patient?.weight;
      this.systolic = this.report?.sys;
      this.diastolic = this.report?.dia;
      this.pulse = this.report?.pulse;
      this.temperature = this.report?.temp;
      this.respiration = this.report?.resp;
    },
  },
};
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.icon-container {
  display: flex;
  align-items: center;
  padding: 10px;
}
</style>
