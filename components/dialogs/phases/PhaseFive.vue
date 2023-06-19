<template>
    <v-row>
      <v-col cols="6">
        <!-- <v-text-field 
            :value="phaseFiveForm.phaseFiveRoomAssignment"
            label="Phase 5 Room Assignment"
            type="number"
            @input="updatePhaseFiveRoomAssignment"     
        ></v-text-field> -->
      </v-col>
    </v-row>

  </template>
  
  <script>
  export default {
        props: {
            phaseFiveForm: {
                type: Object,
                required: true
            }
        },
        methods: {
          updatePhaseFiveRoomAssignment(newVal) {
            this.$emit('update:phaseFiveForm', {
              ...this.phaseFiveForm,
              phaseFiveRoomAssignment: newVal
            });
          }
        }
    }
  </script>