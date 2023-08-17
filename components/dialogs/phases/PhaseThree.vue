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
            v-model="displayGrid[i][j]" 
            hide-details 
            dense 
            class="input-field" 
            :items="['X', '']"
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
      rows: ['occ_c',
        'c1_c2',
        'c2_c3',
        'c3_c4',
        'c4_c5',
        'c5_c6',
        'c6_c7',
        't1_t2',
        't2_t3',
        't3_t4',
        't4_t5',
        't5_t6',
        't6_t7',
        't7_t8',
        't8_t9',
        't9_t10',
        't10_t11',
        't11_t12',
        't12_t13',
        'l1_l2',
        'l2_l3',
        'l3_l4',
        'l4_l5',
        'l5_l6',
        's1_s2',
        's2_s3',
        's3_s4',
        's4_s5',
        's5_s6',],
      
      cols: ['Sides', 'Subluxation', 'Muscle Spasm', 'Trigger Points', 'Tenderness', 'Numbness', 'Edema', 'Swelling', 'Reduced Motion'],
      grid: Array.from({length: 29}, () => Array(9).fill(null)),
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
      booleanColumns: ['Sides', 'Subluxation', 'Muscle Spasm', 'Trigger Points', 'Tenderness', 'Numbness', 'Edema', 'Swelling', 'Reduced Motion'],
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
        let rowIndex = this.rows.findIndex(row => row.toLowerCase() === entry.spinalLevel);
        this.booleanColumns.forEach((col, colIndex) => {
            const key = this.camelCaseColumns[col];
            if (entry[key] !== undefined) {
              this.grid[rowIndex][colIndex] = entry[key] ? 'X' : '';
            }
          });
        if (entry.side) {
          let colIndex = this.cols.findIndex(col => col === 'Sides');
          let sideOption = this.sidesOptions.find(option => option.value === entry.side);
          this.grid[rowIndex][colIndex] = sideOption.text;
        }
      }
    }
  }
},
computed: {
  displayGrid() {
    return this.grid.map(row => {
      return row.map((cell, index) => {
        if (this.booleanColumns.includes(this.cols[index])) {
          return cell ? 'X' : '';
        }
        return cell;
      });
    });
  }
},
  methods: {
    updateValue(i, j, value) {
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
        }

        else if (this.booleanColumns.includes(this.cols[j])) {
          this.grid[i][j] = value === 'X' ? true : false;
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

.input-field {
  text-transform: capitalize;
}

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