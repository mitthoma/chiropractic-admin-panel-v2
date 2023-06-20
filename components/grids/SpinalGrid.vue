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
        rows: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12', 'L1', 'L2', 'L3', 'L4', 'L5', 'S1', 'S2', 'S3', 'S4', 'S5'],
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
            const entry = this.entries.find(entry => entry.spinalLevel?.toLowerCase() === this.rows[i]?.toLowerCase());
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