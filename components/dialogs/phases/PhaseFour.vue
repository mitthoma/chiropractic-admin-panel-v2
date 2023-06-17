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

  </template>
  
  <script>
  export default {
        props: {
            phaseFourForm: {
                type: Object,
                required: true
            }
        },
        methods: {
          updatePhaseFourRoomAssignment(newVal) {
            this.$emit('update:phaseFourForm', {
              ...this.phaseFourForm,
              phaseFourRoomAssignment: newVal
            });
          }
        }
    }
  </script>