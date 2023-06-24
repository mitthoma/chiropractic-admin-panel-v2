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
        <v-col class="text-center static-col">
          <div class="mb-1"><strong>{{ row }}</strong></div>
        </v-col>
        <v-col v-for="(col, j) in cols" :key="j">
          <v-text-field
            v-if="col !== 'Sides' && !booleanColumns.includes(col)"
            v-model="grid[i][j]" 
            hide-details 
            dense 
            class="input-field" 
            :placeholder="PHs[col]"
            @input="updateValue(i, j, $event)" />
          <v-select
            v-else-if="col === 'Sides'"
            v-model="grid[i][j]" 
            hide-details 
            dense 
            class="input-field" 
            :items="sidesOptions"
            @input="updateValue(i, j, $event)" />
          <v-select
            v-else
            v-model="grid[i][j]" 
            hide-details 
            dense 
            class="input-field" 
            :items="['true', 'false']"
            @input="updateValue(i, j, $event)" />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    phaseFourForm: {
      type: Object,
      required: true
    }
  },
  data() {
  return {
    dialog: true,
    valid: true,
    rows: ['Shoulder', 'Arm', 'Bicep', 'Tricep', 'Elbow', 'Wrist', 'Hand', 'Hip', 'Thigh', 'Leg', 'Knee', 'Ankle', 'Foot'],
    cols: ['Sides', 'Subluxation', 'Muscle Spasm', 'Trigger Points', 'Tenderness', 'Numbness', 'Edema', 'Swelling', 'Reduced Motion'],
    grid: Array.from({length: 13}, () => Array(9).fill(null)),
    PHs: {
      'Sides': 'LRB',
      'Subluxation': 'SX',
      'Muscle Spasm': 'MS',
      'Trigger Points': 'TP',
      'Tenderness': 'TN',
      'Numbness': 'NB',
      'Edema': 'ED',
      'Swelling': 'SW',
      'Reduced Motion': 'RM'
    },
    changes: [],
    booleanColumns: ['Subluxation', 'Muscle Spasm', 'Trigger Points', 'Tenderness', 'Numbness', 'Edema', 'Swelling', 'Reduced Motion'],
    sidesOptions: [
        { text: 'Left', value: 'l' },
        { text: 'Right', value: 'r' },
        { text: 'Both', value: 'b' },
      ],

  };
},
  methods: {
    updateValue(i, j, value) {
      this.$emit('update:phaseFourForm', this.grid); // emit the changes
      this.$emit('update:extremityGrid', this.grid);

    },
  }
}
</script>

<style scoped>
/* .v-text-field {
  max-width: 50px;
  margin: 0;
} */

/* .rotate {
  transform: rotate(90deg);
  margin-bottom: 10px;
} */

.grid-container {
  max-height: 70vh;
  padding: 20px;
}

.dialog-card {
  max-width: 90vw;
}

.header-row {
  position: sticky;
  top: 0;
  z-index: 1;
  padding-bottom: 50px; /* Added padding */
}

.static-col {
  position: sticky;
  left: 0;
  z-index: 1;
  padding-right: 50px;
}

.scrollable-content {
  overflow: auto;
  max-height: 70vh;
  overflow-x: auto; /* Added overflow-x */
  padding-top: 15px;
}
.v-text-field {
  width: 100%;
  /* margin: 0 auto; */
  margin-left: 5px;
  margin-right: 5px;
}

.v-col {
  padding: 0;
  flex: 1;
  margin: 10px;
}

.rotate {
  transform: rotate(90deg);
  margin-bottom: 10px;
  white-space: normal; 
  line-height: 1.2;
  height: 80px;   
  width: 100px;  
  overflow: hidden;
  /* padding-top: 15px; */
  text-align: center; /* Centers the header text */
}

</style>