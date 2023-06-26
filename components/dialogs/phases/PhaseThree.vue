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
            :items="['Left', 'Right', 'Both']"
            @update:modelValue="updateValue(i, j, $event)" />
          <v-select
            v-else
            v-model="grid[i][j]" 
            hide-details 
            dense 
            class="input-field" 
            :items="['True', 'False']"
            @update:modelValue="updateValue(i, j, $event)" />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    phaseTwoForm: {
      type: Object,
      required: true
    },
    existingData: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      dialog: true,
      valid: true,
      rows: ['C1', 'C2', 'C3', 'C4', 'C5', 'T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12', 'L1', 'L2', 'L3', 'L4', 'L5', 'S1', 'S2', 'S3', 'S4', 'S5'],
      cols: ['Sides', 'Subluxation', 'Muscle Spasm', 'Trigger Points', 'Tenderness', 'Numbness', 'Edema', 'Swelling', 'Reduced Motion'],
      grid: Array.from({length: 27}, () => Array(9).fill(null)),
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
      camelCaseColumns: {
        'Sides': 'sides',
        'Subluxation': 'subluxation',
        'Muscle Spasm': 'muscleSpasm',
        'Trigger Points': 'triggerPoints',
        'Tenderness': 'tenderness',
        'Numbness': 'numbness',
        'Edema': 'edema',
        'Swelling': 'swelling',
        'Reduced Motion': 'reducedMotion'
      },
    };
},
mounted() {
  if (this.existingData) {
    for (let entry of this.existingData) {
      if (entry) {
        console.log('entry is ', entry);
        // find index of the spinal level in the rows
        let rowIndex = this.rows.findIndex(row => row.toLowerCase() === entry.spinalLevel);
        // for each booleanColumns check if it exists in the entry, if so set the corresponding grid cell to true
        this.booleanColumns.forEach((col, colIndex) => {
            const key = this.camelCaseColumns[col];
            if (entry[key] !== undefined) {
              this.grid[rowIndex][colIndex] = entry[key] ? 'True' : '';
            }
          });
        // check if side exists in the entry, if so set the corresponding grid cell
        if (entry.side) {
          console.log('entry.side is ', entry.side);
          let colIndex = this.cols.findIndex(col => col === 'Sides');
          let sideOption = this.sidesOptions.find(option => option.value === entry.side);
          this.grid[rowIndex][colIndex] = sideOption.text;
        }
      }
    }
  }
},
  methods: {
    updateValue(i, j, value) {
      console.log('UPDATE VALUE BEING CALLED and value is ', value);
        // Convert "Left", "Right", "Both" to "l", "r", "b"
        if (this.cols[j] === 'Sides') {
          switch (value) {
            case 'Left':
              this.grid[i][j] = 'l';
              break;
            case 'Right':
              this.grid[i][j] = 'r';
              break;
            case 'Both':
              this.grid[i][j] = 'b';
              break;
            default:
              this.grid[i][j] = null;
          }
          console.log('this grid i j is', this.grid[i][j])
        }


        // Convert "True", "False" to boolean true, false
        else if (this.booleanColumns.includes(this.cols[j])) {
          this.grid[i][j] = value === 'True' ? true : false;
        }

        else {
          this.grid[i][j] = value;
        }

        this.$emit('update:phaseTwoForm', this.grid); // emit the changes
        this.$emit('update:spinalGrid', this.grid);
      }
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