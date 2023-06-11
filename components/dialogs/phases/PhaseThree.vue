<template>
    <v-row>
      <v-col cols="6">
        <v-text-field 
          :value="phaseThreeForm.phaseThreeRoomAssignment"
          label="Phase 3 Room Assignment"
          type="number" 
          @input="updatePhaseThreeRoomAssignment" 
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-text-field
          :value="phaseThreeForm.physio"
          label="Physio"
          type="number"
          @input="updatePhysio"
        ></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field
          :value="phaseThreeForm.tx"
          label="TX"
          type="number"
          @input="updateTx"
        ></v-text-field>
      </v-col>
    </v-row>
  </template>
  
  <script>
  export default {
    props: ['phaseThreeForm'],
    methods: {
      updatePhaseThreeRoomAssignment(value) {
        this.$emit('update:phaseThreeForm.phaseThreeRoomAssignment', value);
      },
      updatePhysio(value) {
        this.$emit('update:phaseThreeForm.physio', value);
      },
      updateTx(value) {
        this.$emit('update:phaseThreeForm.tx', value);
      }
    }
  }
  </script>