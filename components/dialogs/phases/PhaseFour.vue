<template>
    <v-row>
      <v-col cols="6">
        <v-text-field 
            v-model="phaseFourForm.phaseFourRoomAssignment"
            label="Phase 4 Room Assignment"
            type="number" 
            
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-textarea
            v-model="phaseFourForm.additionalNotes"
          label="Additional Notes"
          auto-grow
        ></v-textarea>
      </v-col>
    </v-row>
  </template>
  
  <script>
  export default {
        props: {
            phaseFourForm: {
                type: Object,
                required: true
            }
        }
    }
  </script>