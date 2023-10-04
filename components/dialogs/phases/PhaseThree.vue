<template>
  <div class="grid-container">
    <!-- <v-row class="header-row text-center">
      <v-col cols="1"></v-col>

      <v-col cols="1">
        hi
      </v-col>
      <v-col cols="1">
        hi
      </v-col>
      <v-col cols="1">
        hi
      </v-col>
      <v-col cols="1">
        hi
      </v-col>
      <v-col cols="1">
        hi
      </v-col>
      <v-col cols="1">
        hi
      </v-col>
      <v-col cols="1">
        hi
      </v-col>
      <v-col cols="1">
        hi
      </v-col>
      <v-col cols="1">
        hi
      </v-col>
      <v-col cols="1">
        hi
      </v-col>
      <v-col cols="1">
        hi
      </v-col>
      

      
    </v-row> -->

    <v-row>
        <v-col cols="1" class="text-center static-col"></v-col>
        <v-col cols="1" class="text-center static-col"></v-col>

        <v-col cols="11">
          <v-row v-for="modifiedRow in modifiedRows(30, 31)" :key="modifiedRow.index">
            <v-col class="text-center static-col">
              <div class="mb-1"><strong>{{ getRangeLabel(modifiedRow.row) }}</strong></div>
            </v-col>
            <v-col v-for="(col, j) in cols" :key="j" >
              <div class="mb-1 rotate"><strong>{{ col }}</strong></div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    <div class="scrollable-content">
      <v-row>
        <v-col cols="1" class="text-center static-col">
          <div class="mb-1">Sub Occ</div>
        </v-col>
        <v-col cols="1" class="text-center static-col">
          <div class="mb-1">Sub Occ</div>
        </v-col>
        <v-col cols="11">
          <v-row v-for="modifiedRow in modifiedRows(0, 1)" :key="modifiedRow.index">
            <v-col class="text-center static-col">
              <div class="mb-1"><strong>{{ getRangeLabel(modifiedRow.row) }}</strong></div>
            </v-col>
            <v-col v-for="(col, j) in cols" :key="j">
              <v-text-field
                v-if="col !== 'Sides' && !booleanColumns.includes(col)"
                v-model="grid[modifiedRow.index][j]"
                hide-details
                dense
                class="input-field"
                :placeholder="PHs[col]"
                @input="updateValue(modifiedRow.index, j, $event)" />
                <v-select
                v-else-if="col === 'Sides'"
                v-model="grid[modifiedRow.index][j]"
                :items="['Left', 'Right', 'Both']"
                dense
                class="input-field"
                @input="updateValue(modifiedRow.index, j, $event)" />
                <div v-else @click="toggleX(modifiedRow.index, j)" class="x-toggle">
                  <SvgRender v-if="displayGrid[modifiedRow.index][j] === 'X'" :width="20" :height="20" icon="x" />
                </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="1" class="text-center static-col">
          <div class="mb-1">Upper Cerv</div>
        </v-col>
        <v-col cols="11">
          <v-row v-for="modifiedRow in modifiedRows(1, 3)" :key="modifiedRow.index">
            <v-col class="text-center static-col">
              <div class="mb-1"><strong>{{ getRangeLabel(modifiedRow.row) }}</strong></div>
            </v-col>
            <v-col v-for="(col, j) in cols" :key="j">
              <v-text-field
                v-if="col !== 'Sides' && !booleanColumns.includes(col)"
                v-model="grid[modifiedRow.index][j]"
                hide-details
                dense
                class="input-field"
                :placeholder="PHs[col]"
                @input="updateValue(modifiedRow.index, j, $event)" />
                <v-select
                v-else-if="col === 'Sides'"
                v-model="grid[modifiedRow.index][j]"
                :items="['Left', 'Right', 'Both']"
                dense
                class="input-field"
                @input="updateValue(modifiedRow.index, j, $event)" />
                <div v-else @click="toggleX(modifiedRow.index, j)" class="x-toggle">
                  <SvgRender v-if="displayGrid[modifiedRow.index][j] === 'X'" :width="20" :height="20" icon="x" />
                </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="1" class="text-center static-col ">
          <div class="mb-1">Mid Cerv</div>
        </v-col>
        <v-col cols="11">
          <v-row v-for="modifiedRow in modifiedRows(3, 5)" :key="modifiedRow.index">
            <v-col class="text-center static-col">
              <div class="mb-1"><strong>{{ getRangeLabel(modifiedRow.row) }}</strong></div>
            </v-col>
            <v-col v-for="(col, j) in cols" :key="j">
              <v-text-field
                v-if="col !== 'Sides' && !booleanColumns.includes(col)"
                v-model="grid[modifiedRow.index][j]"
                hide-details
                dense
                class="input-field"
                :placeholder="PHs[col]"
                @input="updateValue(modifiedRow.index, j, $event)" />
                <v-select
                v-else-if="col === 'Sides'"
                v-model="grid[modifiedRow.index][j]"
                :items="['Left', 'Right', 'Both']"
                dense
                class="input-field"
                @input="updateValue(modifiedRow.index, j, $event)" />
                <div v-else @click="toggleX(modifiedRow.index, j)" class="x-toggle">
                  <SvgRender v-if="displayGrid[modifiedRow.index][j] === 'X'" :width="20" :height="20" icon="x" />
                </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="1" class="text-center static-col ">
          <div class="mb-1">Lower Cerv</div>
        </v-col>
        <v-col cols="11">
          <v-row v-for="modifiedRow in modifiedRows(5, 8)" :key="modifiedRow.index">
            <v-col class="text-center static-col">
              <div class="mb-1"><strong>{{ getRangeLabel(modifiedRow.row) }}</strong></div>
            </v-col>
            <v-col v-for="(col, j) in cols" :key="j">
              <v-text-field
                v-if="col !== 'Sides' && !booleanColumns.includes(col)"
                v-model="grid[modifiedRow.index][j]"
                hide-details
                dense
                class="input-field"
                :placeholder="PHs[col]"
                @input="updateValue(modifiedRow.index, j, $event)" />
                <v-select
                v-else-if="col === 'Sides'"
                v-model="grid[modifiedRow.index][j]"
                :items="['Left', 'Right', 'Both']"
                dense
                class="input-field"
                @input="updateValue(modifiedRow.index, j, $event)" />
                <div v-else @click="toggleX(modifiedRow.index, j)" class="x-toggle">
                  <SvgRender v-if="displayGrid[modifiedRow.index][j] === 'X'" :width="20" :height="20" icon="x" />
                </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="1" class="text-center static-col ">
          <div class="mb-1">Upper T</div>
        </v-col>
        <v-col cols="11">
          <v-row v-for="modifiedRow in modifiedRows(8, 10)" :key="modifiedRow.index">
            <v-col class="text-center static-col">
              <div class="mb-1"><strong>{{ getRangeLabel(modifiedRow.row) }}</strong></div>
            </v-col>
            <v-col v-for="(col, j) in cols" :key="j">
              <v-text-field
                v-if="col !== 'Sides' && !booleanColumns.includes(col)"
                v-model="grid[modifiedRow.index][j]"
                hide-details
                dense
                class="input-field"
                :placeholder="PHs[col]"
                @input="updateValue(modifiedRow.index, j, $event)" />
                <v-select
                v-else-if="col === 'Sides'"
                v-model="grid[modifiedRow.index][j]"
                :items="['Left', 'Right', 'Both']"
                dense
                class="input-field"
                @input="updateValue(modifiedRow.index, j, $event)" />
                <div v-else @click="toggleX(modifiedRow.index, j)" class="x-toggle">
                  <SvgRender v-if="displayGrid[modifiedRow.index][j] === 'X'" :width="20" :height="20" icon="x" />
                </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="1" class="text-center static-col ">
          <div class="mb-1">Mid T</div>
        </v-col>
        <v-col cols="11">
          <v-row v-for="modifiedRow in modifiedRows(10, 14)" :key="modifiedRow.index">
            <v-col class="text-center static-col">
              <div class="mb-1"><strong>{{ getRangeLabel(modifiedRow.row) }}</strong></div>
            </v-col>
            <v-col v-for="(col, j) in cols" :key="j">
              <v-text-field
                v-if="col !== 'Sides' && !booleanColumns.includes(col)"
                v-model="grid[modifiedRow.index][j]"
                hide-details
                dense
                class="input-field"
                :placeholder="PHs[col]"
                @input="updateValue(modifiedRow.index, j, $event)" />
                <v-select
                v-else-if="col === 'Sides'"
                v-model="grid[modifiedRow.index][j]"
                :items="['Left', 'Right', 'Both']"
                dense
                class="input-field"
                @input="updateValue(modifiedRow.index, j, $event)" />
                <div v-else @click="toggleX(modifiedRow.index, j)" class="x-toggle">
                  <SvgRender v-if="displayGrid[modifiedRow.index][j] === 'X'" :width="20" :height="20" icon="x" />
                </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="1" class="text-center static-col ">
          <div class="mb-1">Lower T</div>
        </v-col>
        <v-col cols="11">
          <v-row v-for="modifiedRow in modifiedRows(14, 20)" :key="modifiedRow.index">
            <v-col class="text-center static-col">
              <div class="mb-1"><strong>{{ getRangeLabel(modifiedRow.row) }}</strong></div>
            </v-col>
            <v-col v-for="(col, j) in cols" :key="j">
              <v-text-field
                v-if="col !== 'Sides' && !booleanColumns.includes(col)"
                v-model="grid[modifiedRow.index][j]"
                hide-details
                dense
                class="input-field"
                :placeholder="PHs[col]"
                @input="updateValue(modifiedRow.index, j, $event)" />
                <v-select
                v-else-if="col === 'Sides'"
                v-model="grid[modifiedRow.index][j]"
                :items="['Left', 'Right', 'Both']"
                dense
                class="input-field"
                @input="updateValue(modifiedRow.index, j, $event)" />
                <div v-else @click="toggleX(modifiedRow.index, j)" class="x-toggle">
                  <SvgRender v-if="displayGrid[modifiedRow.index][j] === 'X'" :width="20" :height="20" icon="x" />
                </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="1" class="text-center static-col ">
          <div class="mb-1">Upper L</div>
        </v-col>
        <v-col cols="11">
          <v-row v-for="modifiedRow in modifiedRows(20, 22)" :key="modifiedRow.index">
            <v-col class="text-center static-col">
              <div class="mb-1"><strong>{{ getRangeLabel(modifiedRow.row) }}</strong></div>
            </v-col>
            <v-col v-for="(col, j) in cols" :key="j">
              <v-text-field
                v-if="col !== 'Sides' && !booleanColumns.includes(col)"
                v-model="grid[modifiedRow.index][j]"
                hide-details
                dense
                class="input-field"
                :placeholder="PHs[col]"
                @input="updateValue(modifiedRow.index, j, $event)" />
                <v-select
                v-else-if="col === 'Sides'"
                v-model="grid[modifiedRow.index][j]"
                :items="['Left', 'Right', 'Both']"
                dense
                class="input-field"
                @input="updateValue(modifiedRow.index, j, $event)" />
                <div v-else @click="toggleX(modifiedRow.index, j)" class="x-toggle">
                  <SvgRender v-if="displayGrid[modifiedRow.index][j] === 'X'" :width="20" :height="20" icon="x" />
                </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="1" class="text-center static-col ">
          <div class="mb-1">Lower L</div>
        </v-col>
        <v-col cols="11">
          <v-row v-for="modifiedRow in modifiedRows(22, 25)" :key="modifiedRow.index">
            <v-col class="text-center static-col">
              <div class="mb-1"><strong>{{ getRangeLabel(modifiedRow.row) }}</strong></div>
            </v-col>
            <v-col v-for="(col, j) in cols" :key="j">
              <v-text-field
                v-if="col !== 'Sides' && !booleanColumns.includes(col)"
                v-model="grid[modifiedRow.index][j]"
                hide-details
                dense
                class="input-field"
                :placeholder="PHs[col]"
                @input="updateValue(modifiedRow.index, j, $event)" />
                <v-select
                v-else-if="col === 'Sides'"
                v-model="grid[modifiedRow.index][j]"
                :items="['Left', 'Right', 'Both']"
                dense
                class="input-field"
                @input="updateValue(modifiedRow.index, j, $event)" />
                <div v-else @click="toggleX(modifiedRow.index, j)" class="x-toggle">
                  <SvgRender v-if="displayGrid[modifiedRow.index][j] === 'X'" :width="20" :height="20" icon="x" />
                </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="1" class="text-center static-col ">
          <div class="mb-1">Upper S</div>
        </v-col>
        <v-col cols="11">
          <v-row v-for="modifiedRow in modifiedRows(25, 27)" :key="modifiedRow.index">
            <v-col class="text-center static-col">
              <div class="mb-1"><strong>{{ getRangeLabel(modifiedRow.row) }}</strong></div>
            </v-col>
            <v-col v-for="(col, j) in cols" :key="j">
              <v-text-field
                v-if="col !== 'Sides' && !booleanColumns.includes(col)"
                v-model="grid[modifiedRow.index][j]"
                hide-details
                dense
                class="input-field"
                :placeholder="PHs[col]"
                @input="updateValue(modifiedRow.index, j, $event)" />
                <v-select
                v-else-if="col === 'Sides'"
                v-model="grid[modifiedRow.index][j]"
                :items="['Left', 'Right', 'Both']"
                dense
                class="input-field"
                @input="updateValue(modifiedRow.index, j, $event)" />
                <div v-else @click="toggleX(modifiedRow.index, j)" class="x-toggle">
                  <SvgRender v-if="displayGrid[modifiedRow.index][j] === 'X'" :width="20" :height="20" icon="x" />
                </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="1" class="text-center static-col ">
          <div class="mb-1">Lower S</div>
        </v-col>
        <v-col cols="11">
          <v-row v-for="modifiedRow in modifiedRows(27, 30)" :key="modifiedRow.index">
            <v-col class="text-center static-col">
              <div class="mb-1"><strong>{{ getRangeLabel(modifiedRow.row) }}</strong></div>
            </v-col>
            <v-col v-for="(col, j) in cols" :key="j">
              <v-text-field
                v-if="col !== 'Sides' && !booleanColumns.includes(col)"
                v-model="grid[modifiedRow.index][j]"
                hide-details
                dense
                class="input-field"
                :placeholder="PHs[col]"
                @input="updateValue(modifiedRow.index, j, $event)" />
                <v-select
                v-else-if="col === 'Sides'"
                v-model="grid[modifiedRow.index][j]"
                :items="['Left', 'Right', 'Both']"
                dense
                class="input-field"
                @input="updateValue(modifiedRow.index, j, $event)" />
                <div v-else @click="toggleX(modifiedRow.index, j)" class="x-toggle">
                  <SvgRender v-if="displayGrid[modifiedRow.index][j] === 'X'" :width="20" :height="20" icon="x" />
                </div>
            </v-col>
          </v-row>
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
      rows: [
        'occ_c1',
        'c1_c2',
        'c2_c3',
        'c3_c4',
        'c4_c5',
        'c5_c6',
        'c6_c7',
        'c7_t1',
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
        't12_l1',
        'l1_l2',
        'l2_l3',
        'l3_l4',
        'l4_l5',
        'l5_s1',
        's1_s2',
        's2_s3',
        's3_s4',
        's4_s5',
        's5',
        '',
      ],
      
      cols: ['Sides', 'Subluxation', 'Muscle Spasm', 'Trigger Points', 'Tenderness', 'Numbness', 'Edema', 'Swelling', 'Reduced Motion'],
      grid: Array.from({length: 30}, () => Array(9).fill(null)),
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
  },
  
},
  methods: {
    getRangeLabel(row, i) {
          return row.toUpperCase().replace("_", " - ");
      },
    modifiedRows(slice1, slice2) {
      return this.rows.slice(slice1, slice2).map((row, index) => {
        return { row, index: slice1 + index };
      });
    },
    toggleX(i, j) {
      if (this.grid[i][j]) {
        this.grid[i][j] = false;
        this.updateValue(i, j, '');
      } else {
        this.grid[i][j] = true;
        this.updateValue(i, j, 'X');
      }
    },
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
  /* padding-bottom: 50px;  */
}

/* .static-col {
  position: sticky;
  left: 0;
  z-index: 1;
} */

.scrollable-content {
  /* overflow: auto; */
  max-height: 50vh;
  overflow-y: auto;
  /* overflow-x: visible; */
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
  margin-bottom: 40px !important;
  white-space: normal; 
  /* line-height: 1.2; */
  /* height: 80px;    */
  /* width: 100px;   */
  overflow: hidden;
  /* padding-top: 15px; */
  text-align: center; /* Centers the header text */
}


.centered-label {
  display: flex;
  align-items: center;
  justify-content: center;
}

.x-toggle {
  width: 100%;
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.alternating-bg {
  background-color: #474747;
}



</style>