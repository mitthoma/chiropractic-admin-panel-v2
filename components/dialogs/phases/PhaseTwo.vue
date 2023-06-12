<template>
    <v-row>
      <v-col cols="6">
        <v-text-field 
            v-model="phaseTwoForm.phaseTwoRoomAssignment" 
            label="Phase 2 Room Assignment"
            type="number"
        ></v-text-field>
      </v-col>
    </v-row>
  </template>
  
  <script>
    export default {
        props: {
            phaseTwoForm: {
                type: Object,
                required: true
            }
        }
    }
  </script>