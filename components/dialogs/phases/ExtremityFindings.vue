<template>
  <div class="grid-container">
    <v-row class="header-row text-center">
      <v-col></v-col>
      <v-col v-for="(col, j) in cols" :key="j">
        <div class="mb-1 rotate pt-3">
          <strong>{{ col }}</strong>
        </div>
      </v-col>
    </v-row>
    <div class="scrollable-content">
      <v-row v-for="(row, i) in rows" :key="i">
        <v-col class="text-center static-col">
          <div class="mb-1">
            <strong>{{ row }}</strong>
          </div>
        </v-col>
        <v-col v-for="(col, j) in cols" :key="j">
          <div
            class="x-toggle"
            @click="
              toggleX(
                i,
                j,
                j === 0 ? 'l' : j === 1 ? 'r' : j === 2 ? 'b' : null
              )
            "
          >
            <SvgRender
              v-if="displayGrid[i][j] === 'X'"
              :width="20"
              :height="20"
              icon="x"
            />
          </div>
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
      required: true,
    },
    existingData: {
      type: Object,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      dialog: true,
      valid: true,
      rows: [
        'Shoulder',
        'Arm',
        'Bicep',
        'Tricep',
        'Elbow',
        'Wrist',
        'Hand',
        'Hip',
        'Thigh',
        'Leg',
        'Knee',
        'Calf',
        'Ankle',
        'Foot',
      ],
      cols: [
        'Left',
        'Right',
        'Both',
        'Subluxation',
        'Muscle Spasm',
        'Trigger Points',
        'Tenderness',
        'Numbness',
        'Edema',
        'Swelling',
        'Reduced Motion',
      ],
      grid: Array.from({ length: 14 }, () => Array(11).fill(null)),
      answerGrid: Array.from({ length: 14 }, () => Array(9).fill(null)),
      PHs: {
        Sides: 'LRB',
        Subluxation: 'SX',
        'Muscle Spasm': 'MS',
        'Trigger Points': 'TP',
        Tenderness: 'TN',
        Numbness: 'NB',
        Edema: 'ED',
        Swelling: 'SW',
        'Reduced Motion': 'RM',
      },
      changes: [],
      booleanColumns: [
        'Left',
        'Right',
        'Both',
        'Subluxation',
        'Muscle Spasm',
        'Trigger Points',
        'Tenderness',
        'Numbness',
        'Edema',
        'Swelling',
        'Reduced Motion',
      ],
      answerGridColumns: [
        'Sides',
        'Subluxation',
        'Muscle Spasm',
        'Trigger Points',
        'Tenderness',
        'Numbness',
        'Edema',
        'Swelling',
        'Reduced Motion',
      ],

      sidesOptions: [
        { text: 'Left', value: 'l' },
        { text: 'Right', value: 'r' },
        { text: 'Both', value: 'b' },
      ],
      camelCaseColumns: {
        Sides: 'sides',
        Subluxation: 'sublux',
        'Muscle Spasm': 'muscleSpasm',
        'Trigger Points': 'triggerPoints',
        Tenderness: 'tenderness',
        Numbness: 'numbness',
        Edema: 'edema',
        Swelling: 'swelling',
        'Reduced Motion': 'reducedMotion',
      },
    };
  },
  computed: {
    displayGrid() {
      return this.grid.map((row) => {
        return row.map((cell, index) => {
          if (this.booleanColumns.includes(this.cols[index])) {
            return cell ? 'X' : '';
          }
          return cell;
        });
      });
    },
  },
  mounted() {
    if (this.existingData) {
      for (const entry of this.existingData) {
        if (entry) {
          const rowIndex = this.rows.findIndex(
            (row) => row.toLowerCase() === entry.extremityLevel
          );
          this.answerGridColumns.forEach((col, colIndex) => {
            if (col === 'Sides') {
              const key = 'side';
              if (entry[key] !== undefined) {
                this.answerGrid[rowIndex][colIndex] = entry[key]
                  ? entry[key]
                  : '';
              }
            } else {
              const key = this.camelCaseColumns[col];
              if (entry[key] !== undefined) {
                this.answerGrid[rowIndex][colIndex] = entry[key] ? 'X' : '';
              }
            }
          });
        }
      }
      for (const entry of this.existingData) {
        if (entry) {
          const rowIndex = this.rows.findIndex(
            (row) => row.toLowerCase() === entry.extremityLevel
          );
          this.booleanColumns.forEach((col, colIndex) => {
            const key = this.camelCaseColumns[col];
            if (entry[key] !== undefined) {
              this.grid[rowIndex][colIndex] = entry[key] ? 'X' : '';
            }
          });
          if (entry.side) {
            const colLabel =
              entry.side === 'l'
                ? 'Left'
                : entry.side === 'r'
                  ? 'Right'
                  : entry.side === 'b'
                    ? 'Both'
                    : null;
            if (colLabel) {
              const colIndex = this.cols.findIndex((col) => col === colLabel);
              this.grid[rowIndex][colIndex] = 'X';
            }
          }
        }
      }
    }
    this.$emit('update:extremityGrid', this.answerGrid);
  },
  methods: {
    toggleX(i, j, sideOption = null) {
      // Check if the column clicked is 'left', 'right', or 'both'
      console.log('j is ', j);
      if (j >= 0 && j <= 2) {
        // Check if there's already an 'X' in the clicked cell
        console.log('grid i j is ', this.grid[i][j]);
        if (this.grid[i][j] === 'X' || this.grid[i][j]) {
          console.log('HITTING AN X FOR SIDES');
          // Clear the row values and return
          for (let col = 0; col < this.grid[i].length; col++) {
            this.grid[i][col] = false;
            this.answerGrid[i][col] = false;
          }
          this.$emit('update:phaseTwoForm', this.answerGrid);
          this.$emit('update:extremityGrid', this.answerGrid);
          return;
        }
      }

      // Previous logic for setting the selected side
      if (sideOption) {
        let side;

        if (j === 0) {
          side = 'l';
        } else if (j === 1) {
          side = 'r';
        } else if (j === 2) {
          side = 'b';
        }

        this.grid[i][0] = false;
        this.grid[i][1] = false;
        this.grid[i][2] = false;

        this.grid[i][j] = true;
        this.answerGrid[i][0] = side;
      } else if (this.grid[i][j]) {
        this.grid[i][j] = false;
        this.answerGrid[i][j - 2] = false;
      } else {
        this.grid[i][j] = true;
        this.answerGrid[i][j - 2] = true;
      }

      this.$emit('update:extremityGrid', this.answerGrid);
    },
  },
};
</script>

<style scoped>
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
  /* overflow: auto; */
  max-height: 45vh;
  overflow-x: auto; /* Added overflow-x */
  overflow-y: auto;
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

.x-toggle {
  width: 100%;
  padding: 10px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
