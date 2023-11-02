<template>
  <v-row>
    <v-col cols="4">
      <v-suffix>Date of Appointment</v-suffix>
    </v-col>
  </v-row>
  <v-row>
      <v-col cols="4">
        <VueDatePicker
          v-model="visitDateTime"
          teleport-center 
          :enable-time-picker="false"
          format="dd MMMM yyyy"
          placeholder="Visit Date"
          dark
          type="date"
          @change="$emit('edit-visit-date-time', visitDateTime)"
        />
      </v-col>
      <v-col cols="4">
      <v-text-field 
          variant="outlined"
          :value="phaseTwoForm.visitDateText"
          placeholder="Visit Date Text Entry"
          type="text"
          @input="updatePhaseTwoVisitDateText"     
      ></v-text-field>
      </v-col>
  </v-row>
  <v-row>
    <v-col cols="4">
      <v-suffix>Temperature</v-suffix>
    </v-col>
    <v-col cols="4">
      <v-suffix>Blood Pressure</v-suffix>
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="4">
      <v-text-field 
          variant="outlined"
          :value="phaseTwoForm.temperature"
          suffix="F"
          type="text"
          placeholder="Temperature"     
          @input="updatePhaseTwoTemperature"
          :rules="[rules.temperature]"

      ></v-text-field>
    </v-col>
    <v-col cols="4">
      <v-text-field 
          variant="outlined"
          :value="phaseTwoForm.systolic"
          suffix="Sys"
          type="number"
          placeholder="Systolic"    
          @input="updatePhaseTwoSystolic"
          :rules="[rules.systolic]"

      ></v-text-field>
    </v-col>
    <v-col cols="4">
      <v-text-field 
          variant="outlined"
          :value="phaseTwoForm.diastolic"
          suffix="Dia"
          type="number"
          placeholder="Diastolic"  
          @input="updatePhaseTwoDiastolic"
          :rules="[rules.diastolic]"

      ></v-text-field>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="6">
      <v-suffix>Pulse</v-suffix>
    </v-col>
    <v-col cols="6">
      <v-suffix>Respiration</v-suffix>
    </v-col>
  </v-row>
  <v-row class="mb-12">
    <v-col cols="6">
      <v-text-field 
          variant="outlined"
          :value="phaseTwoForm.pulse"
          suffix="ppm"
          type="number"
          placeholder="Pulse"    
          @input="updatePhaseTwoPulse"
          :rules="[rules.pulse]"

      ></v-text-field>
    </v-col>
    <v-col cols="6">
      <v-text-field 
            variant="outlined"
          :value="phaseTwoForm.respiration"
          suffix="bpm"
          type="number"
          placeholder="Respiration"     
          @input="updatePhaseTwoRespiration"
          :rules="[rules.respiration]"

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
      async mounted() {

        if (this.selectedItem && this.selectedItem.visitDate) {
            this.visitDateTime = new Date(this.selectedItem.visitDate);
        }

      },
      data() {
        return {
          visitDateTime: null,
          visitDate: null,
          rules: {
            required: value => !!value || 'This field is required.',
            temperature: value => {
              if (value === '' || value === null || value === undefined) {
                return true;
              }

              const pattern = /^\d+(\.\d{0,1})?$/;
              if (!pattern.test(value)) {
                return 'Temperature must be a number with at most one decimal place.';
              } else {
                const floatValue = parseFloat(value);
                if (isNaN(floatValue)) {
                  return true;
                }
                return (
                  floatValue >= 97 &&
                  floatValue <= 103
                ) || 'Temperature must be between 97°F and 103°F.';
              }
            },
            systolic: value => {
              if (value === '' || value === null || value === undefined) {
                return true;
              } else {
                return (value >= 80 && value <= 240) || 'Systolic must be between 80 and 240.'
              }
            },
            diastolic: value => {
              if (value === '' || value === null || value === undefined) {
                return true;
              } else {
                return (value >= 50 && value <= 130) || 'Diastolic must be between 50 and 130.'
              }
            },
            pulse: value => {
              if (value === '' || value === null || value === undefined) {
                return true;
              } else {
                return (value >= 40 && value <= 150) || 'Pulse must be between 40 and 150.'
              }
            },
            respiration: value => {
              if (value === '' || value === null || value === undefined) {
                return true;
              } else {
                return (value >= 10 && value <= 30) || 'Respiration must be between 10 and 30.'
              }
            },
          },
          
        };
      },
      watch: {
        visitDateTime(newVal) {
          this.updatePhaseTwoVisitDateTime(newVal);
        },

      },
      methods: {
        updatePhaseTwoTemperature(event) {
          const value = event.target.value;
          if (this.rules.temperature(value)) {
            this.$emit('update:phaseTwoForm', {
              ...this.phaseTwoForm,
              temperature: value,
            });
          }
        },
        updatePhaseTwoSystolic(event) {
          const value = event.target.value;
          if (this.rules.systolic(value)) {
            this.$emit('update:phaseTwoForm', {
              ...this.phaseTwoForm,
              systolic: value
            });
          }
        },
        updatePhaseTwoDiastolic(event) {
          const value = event.target.value;
          if (this.rules.diastolic(value)) {
            this.$emit('update:phaseTwoForm', {
              ...this.phaseTwoForm,
              diastolic: value
            });
          }
        },
        updatePhaseTwoPulse(event) {
          const value = event.target.value;
          if (this.rules.pulse(value)) {
            this.$emit('update:phaseTwoForm', {
              ...this.phaseTwoForm,
              pulse: value
            });
          }
        },
        updatePhaseTwoRespiration(event) {
          const value = event.target.value;
          if (this.rules.respiration(value)) {
            this.$emit('update:phaseTwoForm', {
              ...this.phaseTwoForm,
              respiration: value
            });
          }
        },
        updatePhaseTwoVisitDateTime(newVal) {
          this.$emit('edit-visit-date-time', this.visitDateTime)
        },
        updatePhaseTwoVisitDateText(newVal) {
          this.$emit('update:phaseTwoForm', {
            ...this.phaseTwoForm,
            visitDateText: newVal.target.value
          });
        },
      }
  }
</script>

