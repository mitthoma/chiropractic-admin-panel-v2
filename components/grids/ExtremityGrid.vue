<template>
    <div class="grid-container">
      <v-row class="header-row text-center">
        <v-col></v-col>
        <v-col v-for="(col, j) in cols" :key="j">
          <div class="mb-1 rotate"><strong>{{ col }}</strong></div>
        </v-col>
      </v-row>
      <div class="scrollable-content">
        <v-row v-for="(row, i) in rows" :key="i">
      <v-col class="text-center static-col grid-cell">
        <div class="mb-1"><strong>{{ row }}</strong></div>
      </v-col>
      <v-col v-for="(col, j) in cols" :key="j" class="grid-cell">
        <div>{{ getValue(i, j) }}</div>
      </v-col>
    </v-row>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      entries: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        rows: ['Shoulder', 'Arm', 'Bicep', 'Tricep', 'Elbow', 'Wrist', 'Hand', 'Hip', 'Thigh', 'Leg', 'Knee', 'Ankle', 'Foot'],
        cols: ['Sides', 'Subluxation', 'Muscle Spasm', 'Trigger Points', 'Tenderness', 'Numbness', 'Edema', 'Swelling', 'Reduced Motion'],
        mapColsToFields: {
          'Sides': 'side',
          'Subluxation': 'sublux',
          'Muscle Spasm': 'muscleSpasm',
          'Trigger Points': 'triggerPoints',
          'Tenderness': 'tenderness',
          'Numbness': 'numbness',
          'Edema': 'edema',
          'Swelling': 'swelling',
          'Reduced Motion': 'reducedMotion',
        }
      };
    },
    methods: {
        getValue(i, j) {
            const entry = this.entries.find(entry => entry.extremityLevel?.toLowerCase() === this.rows[i]?.toLowerCase());
            return entry ? entry[this.mapColsToFields[this.cols[j]]] : '';

      }
    }
  }
  </script>

<style scoped>
.grid-cell {
  border: 1px solid gray; /* Change color and thickness as desired */
}
</style>