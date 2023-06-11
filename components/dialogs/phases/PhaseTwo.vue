<template>
    <v-row>
      <v-col cols="6">
        <v-text-field 
          :value="phaseTwoForm.phaseTwoRoomAssignment" 
          label="Phase 2 Room Assignment"
          type="number" 
          @input="updatePhaseTwoRoomAssignment" 
        ></v-text-field>
      </v-col>
    </v-row>
  </template>
  
  <script>
  export default {
    props: ['phaseTwoForm'],
    methods: {
      updatePhaseTwoRoomAssignment(value) {
        this.$emit('update:phaseTwoForm.phaseTwoRoomAssignment', value);
      }
    }
  }
  </script>