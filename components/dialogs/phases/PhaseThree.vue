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

</template>

<script>
export default {
      props: {
          phaseThreeForm: {
              type: Object,
              required: true
          }
      },
      methods: {
        updatePhaseThreeRoomAssignment(newVal) {
          this.$emit('update:phaseThreeForm', {
            ...this.phaseThreeForm,
            phaseThreeRoomAssignment: newVal
          });
        }
      }
  }
</script>