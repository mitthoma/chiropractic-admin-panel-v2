<template>
    <v-row>
      <v-col cols="6">
        <v-text-field
            v-model="phaseThreeForm.phaseThreeRoomAssignment"
            label="Phase 3 Room Assignment"
            type="number" 
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-text-field
          v-model="phaseThreeForm.physio"
          label="Physio"
          type="number"
        ></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field
            v-model="phaseThreeForm.tx"
            label="TX"
            type="number"
        ></v-text-field>
      </v-col>
    </v-row>
  </template>
  
  <script>
  export default {
      props: {
          phaseThreeForm: {
              type: Object,
              required: true
          }
      },
      data() {
          return {
              localPhaseThreeForm: {...this.phaseThreeForm}
          }
      },
      watch: {
          localPhaseThreeForm: {
              handler(val) {
                  this.$emit('update:phaseThreeForm', val);
              },
              deep: true
          }
      }
  }
  </script>