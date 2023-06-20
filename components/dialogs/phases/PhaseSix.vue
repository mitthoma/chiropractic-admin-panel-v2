<template>
    <v-row>
      <v-col cols="6">
        <!-- <v-text-field 
            :value="phaseSixForm.phaseSixRoomAssignment"
            label="Phase 6 Room Assignment"
            type="number"
            @input="updatePhaseSixRoomAssignment"     
        ></v-text-field> -->
      </v-col>
    </v-row>

  </template>
  
  <script>
  export default {
        props: {
            phaseSixForm: {
                type: Object,
                required: true
            }
        },
        methods: {
          updatePhaseSixRoomAssignment(newVal) {
            this.$emit('update:phaseSixForm', {
              ...this.phaseSixForm,
              phaseSixRoomAssignment: newVal
            });
          }
        }
    }
  </script>