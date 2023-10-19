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
          type="number"
          placeholder="Temperature"     
          @input="updatePhaseTwoTemperature"

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
          
        };
      },
      watch: {
        visitDateTime(newVal) {
          console.log('watched!')
          this.updatePhaseTwoVisitDateTime(newVal);
        },

      },
      methods: {
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
          this.$emit('edit-visit-date-time', this.visitDateTime)
          console.log('is this called');
          // this.$emit('update:phaseTwoForm', {
          //   ...this.phaseTwoForm,
          //   visitDate: newVal
          // });
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

