<template>
  <v-row>
    <v-col cols="4">
      <v-label>Room Assignment</v-label>
    </v-col>
    <v-col cols="4">
      <v-label>Date Appointment</v-label>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="4">
      <v-text-field 
          :value="phaseTwoForm.phaseTwoRoomAssignment"
          label="Room Assignment"
          type="number"
          @input="updatePhaseTwoRoomAssignment"     
      ></v-text-field>
      </v-col>
      <v-col cols="4">
        <VueDatePicker label="Date and Time" dark @change="$emit('editVisitDateTime', $event)" />
      </v-col>
      <v-col cols="4">
      <v-text-field 
          :value="phaseTwoForm.visitDateText"
          label="Room Assignment"
          type="number"
          @input="updatePhaseTwoVisitDateText"     
      ></v-text-field>
      </v-col>
  </v-row>
  <v-row>
    <v-col cols="4">
      <v-label>Height</v-label>
    </v-col>
    <v-col cols="2">
      <v-label>Weight</v-label>
    </v-col>
    <v-col cols="2">
      <v-label>Temperature</v-label>
    </v-col>
    <v-col cols="4">
      <v-label>Blood Pressure</v-label>
    </v-col>
  </v-row>
  
  <v-row>
    <v-col cols="2">
      <v-text-field 
          :value="phaseTwoForm.heightFeet"
          label="ft."
          type="number"
          @input="updatePhaseTwoHeightFeet"     
      ></v-text-field>
    </v-col>
    <v-col cols="2">
      <v-text-field 
          :value="phaseTwoForm.heightInches"
          label="in."
          type="number"
          @input="updatePhaseTwoHeightInches"     
      ></v-text-field>
    </v-col>
    <v-col cols="2">
      <v-text-field 
          :value="phaseTwoForm.weight"
          label="lb."
          type="number"
          @input="updatePhaseTwoWeight"     
      ></v-text-field>
    </v-col>
    <v-col cols="2">
      <v-text-field 
          :value="phaseTwoForm.temperature"
          label="F"
          type="number"
          @input="updatePhaseTwoTemperature"     
      ></v-text-field>
    </v-col>
    <v-col cols="2">
      <v-text-field 
          :value="phaseTwoForm.systolic"
          label="Sys"
          type="number"
          @input="updatePhaseTwoSystolic"     
      ></v-text-field>
    </v-col>
    <v-col cols="2">
      <v-text-field 
          :value="phaseTwoForm.diastolic"
          label="Dia"
          type="number"
          @input="updatePhaseTwoDiastolic"     
      ></v-text-field>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="2">
      <v-label>Pulse</v-label>
    </v-col>
    <v-col cols="2">
      <v-label>Respiration</v-label>
    </v-col>
  </v-row>
  <v-row class="mb-12">
    <v-col cols="2">
      <v-text-field 
          :value="phaseTwoForm.pulse"
          label="ppm"
          type="number"
          @input="updatePhaseTwoPulse"     
      ></v-text-field>
    </v-col>
    <v-col cols="2">
      <v-text-field 
          :value="phaseTwoForm.respiration"
          label="bpm"
          type="number"
          @input="updatePhaseTwoRespiration"     
      ></v-text-field>
    </v-col>
  </v-row>
</template>

<script>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

export default {
      components: {
        VueDatePicker
      },
      props: {
          phaseTwoForm: {
              type: Object,
              required: true
          }
      },
      methods: {
        updatePhaseTwoRoomAssignment(newVal) {
          console.log('newVal is ', newVal);
          this.$emit('update:phaseTwoForm', {
            ...this.phaseTwoForm,
            phaseTwoRoomAssignment: newVal.target.value
          });
        },
        updatePhaseTwoHeightFeet(newVal) {
          this.$emit('update:phaseTwoForm', {
            ...this.phaseTwoForm,
            heightFeet: newVal.target.value
          });
        },
        updatePhaseTwoHeightInches(newVal) {
          this.$emit('update:phaseTwoForm', {
            ...this.phaseTwoForm,
            heightInches: newVal.target.value
          });
        },
        updatePhaseTwoWeight(newVal) {
          this.$emit('update:phaseTwoForm', {
            ...this.phaseTwoForm,
            weight: newVal.target.value
          });
        },
        updatePhaseTwoTemperature(newVal) {
          this.$emit('update:phaseTwoForm', {
            ...this.phaseTwoForm,
            temperature: newVal.target.value
          });
        },
        updatePhaseTwoSystolic(newVal) {
          this.$emit('update:phaseTwoForm', {
            ...this.phaseTwoForm,
            systolic: newVal.target.value
          });
        },
        updatePhaseTwoDiastolic(newVal) {
          this.$emit('update:phaseTwoForm', {
            ...this.phaseTwoForm,
            diastolic: newVal.target.value
          });
        },
        updatePhaseTwoPulse(newVal) {
          this.$emit('update:phaseTwoForm', {
            ...this.phaseTwoForm,
            pulse: newVal.target.value
          });
        },
        updatePhaseTwoRespiration(newVal) {
          this.$emit('update:phaseTwoForm', {
            ...this.phaseTwoForm,
            respiration: newVal.target.value
          });
        },
        // updatePhaseTwoVisitDateTime(newVal) {
        //   this.$emit('update:phaseTwoForm', {
        //     ...this.phaseTwoForm,
        //     visit: newVal.target.value
        //   });
        // },
        updatePhaseTwoVisitDateText(newVal) {
          this.$emit('update:phaseTwoForm', {
            ...this.phaseTwoForm,
            respiration: newVal.target.value
          });
        },
      }
  }
</script>

