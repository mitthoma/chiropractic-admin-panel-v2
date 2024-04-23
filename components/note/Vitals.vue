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
import { createNoteService } from '~~/services/note';
import { createPatientService } from '~~/services/patient';

export default {
  name: 'VitalsInfo',
  data() {
    return {
      noteService: null,
      patientService: null,
      patient: null,
      note: null,
      editMode: false,
      heightFeet: this.patient?.heightFeet,
      heightInches: this.patient?.heightInches,
      weight: this.patient?.weight,
      systolic: this.note?.systolic,
      diastolic: this.note?.diastolic,
      pulse: this.note?.pulse,
      temperature: this.note?.temperature,
      respiration: this.note?.respiration,
    };
  },
  async mounted() {
    this.noteService = createNoteService(this.$api);
    this.patientService = createPatientService(this.$api);
    await this.retrieveData();
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
      const notePayload = {
        ...this.note,
        systolic: this.systolic,
        diastolic: this.diastolic,
        pulse: this.pulse,
        temperature: this.temperature,
        respiration: this.respiration,
        id: this.note.id,
      };
      await this.noteService.updateNote(notePayload);
      await this.patientService.updatePatient(patientPayload);
      this.editMode = false;
      await this.retrieveData();
    },
    async retrieveData() {
      this.note = await this.noteService.getNote({
        id: this.$route.params.noteId,
      });

      this.patient = await this.patientService.getPatient({
        id: this.$route.params.id,
      });

      this.heightFeet = this.patient.heightFeet;
      this.heightInches = this.patient.heightInches;
      this.weight = this.patient.weight;

      this.systolic = this.note.systolic;
      this.diastolic = this.note.diastolic;
      this.pulse = this.note.pulse;
      this.temperature = this.note.temperature;
      this.respiration = this.note.respiration;
    },
    async handleCancel() {
      this.editMode = false;
      await this.retrieveData();
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
