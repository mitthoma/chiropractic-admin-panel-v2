<template>
    <v-row>
      <v-col cols="6">
        <v-text-field 
          :value="phaseFourForm.phaseFourRoomAssignment"
          label="Phase 4 Room Assignment"
          type="number" 
          @input="updatePhaseFourRoomAssignment" 
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-textarea
          :value="phaseFourForm.otherNotes"
          label="Additional Notes"
          auto-grow
          @input="updateOtherNotes"
        ></v-textarea>
      </v-col>
    </v-row>
  </template>
  
  <script>
  export default {
    props: ['phaseFourForm'],
    methods: {
      updatePhaseFourRoomAssignment(newVal) {
        this.$emit('update:phaseFourForm', {
          ...this.phaseFourForm,
          phaseFourRoomAssignment: newVal
        });
      },
      updateOtherNotes(newVal) {
        this.$emit('update:phaseFourForm', {
          ...this.phaseFourForm,
          otherNotes: newVal
        });
      },
    }
  }
  </script>