<template>
  <v-row>
    <v-col cols="4">
      <v-suffix>Room Assignment</v-suffix>
    </v-col>
    <v-col cols="4">
      <v-suffix>Date of Appointment</v-suffix>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="4">
      <v-text-field 
          variant="outlined"
          :value="phaseTwoForm.phaseTwoRoomAssignment"
          type="number"
          placeholder="Room Assignment"
          @input="updatePhaseTwoRoomAssignment"     
      ></v-text-field>
      </v-col>
      <v-col cols="4">
        <VueDatePicker
          v-model="visitDateTime"
          placeholder="Visit Date and Time"
          dark
          type="datetime"
          :minute-interval="30"
        />
      </v-col>
      <v-col cols="4">
      <v-text-field 
          variant="outlined"
          :value="phaseTwoForm.visitDateText"
          placeholder="Visit Date Text Entry"
          type="number"
          @input="updatePhaseTwoVisitDateText"     
      ></v-text-field>
      </v-col>
  </v-row>
  <v-row>
    <v-col cols="4">
      <v-suffix>Height</v-suffix>
    </v-col>
    <v-col cols="2">
      <v-suffix>Weight</v-suffix>
    </v-col>
    <v-col cols="2">
      <v-suffix>Temperature</v-suffix>
    </v-col>
    <v-col cols="4">
      <v-suffix>Blood Pressure</v-suffix>
    </v-col>
  </v-row>
  
  <v-row>
    <v-col cols="2">
      <v-text-field
          variant="outlined"
          :value="phaseTwoForm.heightFeet"
          suffix="ft."
          type="number"
          placeholder="Height in Feet"     
          @input="updatePhaseTwoHeightFeet"
      ></v-text-field>
    </v-col>
    <v-col cols="2">
      <v-text-field 
        variant="outlined"
          :value="phaseTwoForm.heightInches"
          suffix="in."
          type="number"
          placeholder="Height in Inches"     
          @input="updatePhaseTwoHeightInches"

      ></v-text-field>
    </v-col>
    <v-col cols="2">
      <v-text-field 
        variant="outlined"
          :value="phaseTwoForm.weight"
          suffix="lb."
          type="number"
          placeholder="Weight"     
          @input="updatePhaseTwoWeight"

      ></v-text-field>
    </v-col>
    <v-col cols="2">
      <v-text-field 
      variant="outlined"
          :value="phaseTwoForm.temperature"
          suffix="F"
          type="number"
          placeholder="Temperature"     
          @input="updatePhaseTwoTemperature"

      ></v-text-field>
    </v-col>
    <v-col cols="2">
      <v-text-field 
      variant="outlined"
          :value="phaseTwoForm.systolic"
          suffix="Sys"
          type="number"
          placeholder="Systolic"    
          @input="updatePhaseTwoSystolic"

      ></v-text-field>
    </v-col>
    <v-col cols="2">
      <v-text-field 
      variant="outlined"
          :value="phaseTwoForm.diastolic"
          suffix="Dia"
          type="number"
          placeholder="Diastolic"  
          @input="updatePhaseTwoDiastolic"

      ></v-text-field>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="2">
      <v-suffix>Pulse</v-suffix>
    </v-col>
    <v-col cols="2">
      <v-suffix>Respiration</v-suffix>
    </v-col>
  </v-row>
  <v-row class="mb-12">
    <v-col cols="2">
      <v-text-field 
      variant="outlined"
          :value="phaseTwoForm.pulse"
          suffix="ppm"
          type="number"
          placeholder="Pulse"    
          @input="updatePhaseTwoPulse"

      ></v-text-field>
    </v-col>
    <v-col cols="2">
      <v-text-field 
        variant="outlined"
          :value="phaseTwoForm.respiration"
          suffix="bpm"
          type="number"
          placeholder="Respiration"     
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
          required: true,
        },
        selectedItem: {
          type: Object,
        },
      },
      data() {
        return {
          visitDateTime: null,
          visitDate: null,
          
        };
      },
      // watch: {
      //   selectedItem: {
      //     immediate: true,
      //     handler(val) {
      //       if (val) {
      //         this.form = { ...val };
      //       } else {
      //         this.resetForm();
      //       }
      //     },
      //   },
      // },
      methods: {
        updatePhaseTwoRoomAssignment(newVal) {
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
        updatePhaseTwoVisitDateTime(newVal) {
          this.$emit('update:phaseTwoForm', {
            ...this.phaseTwoForm,
            visit: newVal.target.value
          });
        },
        updatePhaseTwoVisitDateText(newVal) {
          this.$emit('update:phaseTwoForm', {
            ...this.phaseTwoForm,
            respiration: newVal.target.value
          });
        },
      }
  }
</script>

