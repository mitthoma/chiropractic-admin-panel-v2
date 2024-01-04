<template>
  <div class="grid-container">
    <v-row>
      <v-col cols="1" class="text-center"></v-col>
      <v-col cols="1" class="text-center"></v-col>
      <v-col cols="11">
        <v-row>
          <v-col class="text-center">
            <div class="mb-1"></div>
          </v-col>
          <v-col v-for="(col, j) in cols" :key="j">
            <div class="mb-1 rotate">
              <strong>{{ col }}</strong>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <div class="scrollable-content">
      <v-row>
        <v-col cols="1" class="text-center upper-level">
          <div class="mb-1">C-Levels</div>
        </v-col>
        <v-col cols="1" class="text-center upper-level">
          <div class="mb-1">Sub Occ</div>
        </v-col>
        <v-col cols="11">
          <v-row
            v-for="modifiedRow in modifiedRows(0, 1)"
            :key="modifiedRow.index"
          >
            <v-col class="text-center">
              <div class="mb-1">
                <strong>{{ getRangeLabel(modifiedRow.row) }}</strong>
              </div>
            </v-col>
            <v-col v-for="(col, j) in cols" :key="j">
              <div
                class="x-toggle"
                @click="
                  toggleX(
                    modifiedRow.index,
                    j,
                    j === 0 ? 'l' : j === 1 ? 'r' : j === 2 ? 'b' : null
                  )
                "
              >
                <SvgRender
                  v-if="displayGrid[modifiedRow.index][j] === 'X'"
                  :width="20"
                  :height="20"
                  icon="x"
                />
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="1" class="text-center"></v-col>

        <v-col cols="1" class="text-center upper-level">
          <div class="mb-1">Upper Cerv</div>
        </v-col>
        <v-col cols="11">
          <v-row
            v-for="modifiedRow in modifiedRows(1, 3)"
            :key="modifiedRow.index"
          >
            <v-col class="text-center">
              <div class="mb-1">
                <strong>{{ getRangeLabel(modifiedRow.row) }}</strong>
              </div>
            </v-col>
            <v-col v-for="(col, j) in cols" :key="j">
              <div
                class="x-toggle"
                @click="
                  toggleX(
                    modifiedRow.index,
                    j,
                    j === 0 ? 'l' : j === 1 ? 'r' : j === 2 ? 'b' : null
                  )
                "
              >
                <SvgRender
                  v-if="displayGrid[modifiedRow.index][j] === 'X'"
                  :width="20"
                  :height="20"
                  icon="x"
                />
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="1" class="text-center"></v-col>
        <v-col cols="1" class="text-center upper-level">
          <div class="mb-1">Mid Cerv</div>
        </v-col>
        <v-col cols="11">
          <v-row
            v-for="modifiedRow in modifiedRows(3, 5)"
            :key="modifiedRow.index"
          >
            <v-col class="text-center">
              <div class="mb-1">
                <strong>{{ getRangeLabel(modifiedRow.row) }}</strong>
              </div>
            </v-col>
            <v-col v-for="(col, j) in cols" :key="j">
              <div
                class="x-toggle"
                @click="
                  toggleX(
                    modifiedRow.index,
                    j,
                    j === 0 ? 'l' : j === 1 ? 'r' : j === 2 ? 'b' : null
                  )
                "
              >
                <SvgRender
                  v-if="displayGrid[modifiedRow.index][j] === 'X'"
                  :width="20"
                  :height="20"
                  icon="x"
                />
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="1" class="text-center"></v-col>
        <v-col cols="1" class="text-center upper-level">
          <div class="mb-1">Lower Cerv</div>
        </v-col>
        <v-col cols="11">
          <v-row
            v-for="modifiedRow in modifiedRows(5, 8)"
            :key="modifiedRow.index"
          >
            <v-col class="text-center">
              <div class="mb-1">
                <strong>{{ getRangeLabel(modifiedRow.row) }}</strong>
              </div>
            </v-col>
            <v-col v-for="(col, j) in cols" :key="j">
              <div
                class="x-toggle"
                @click="
                  toggleX(
                    modifiedRow.index,
                    j,
                    j === 0 ? 'l' : j === 1 ? 'r' : j === 2 ? 'b' : null
                  )
                "
              >
                <SvgRender
                  v-if="displayGrid[modifiedRow.index][j] === 'X'"
                  :width="20"
                  :height="20"
                  icon="x"
                />
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="1" class="text-center upper-level">
          <div class="mb-1">T-Levels</div>
        </v-col>
        <v-col cols="1" class="text-center upper-level">
          <div class="mb-1">Upper T</div>
        </v-col>
        <v-col cols="11">
          <v-row
            v-for="modifiedRow in modifiedRows(8, 10)"
            :key="modifiedRow.index"
          >
            <v-col class="text-center">
              <div class="mb-1">
                <strong>{{ getRangeLabel(modifiedRow.row) }}</strong>
              </div>
            </v-col>
            <v-col v-for="(col, j) in cols" :key="j">
              <div
                class="x-toggle"
                @click="
                  toggleX(
                    modifiedRow.index,
                    j,
                    j === 0 ? 'l' : j === 1 ? 'r' : j === 2 ? 'b' : null
                  )
                "
              >
                <SvgRender
                  v-if="displayGrid[modifiedRow.index][j] === 'X'"
                  :width="20"
                  :height="20"
                  icon="x"
                />
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="1" class="text-center"></v-col>
        <v-col cols="1" class="text-center upper-level">
          <div class="mb-1">Mid T</div>
        </v-col>
        <v-col cols="11">
          <v-row
            v-for="modifiedRow in modifiedRows(10, 14)"
            :key="modifiedRow.index"
          >
            <v-col class="text-center">
              <div class="mb-1">
                <strong>{{ getRangeLabel(modifiedRow.row) }}</strong>
              </div>
            </v-col>
            <v-col v-for="(col, j) in cols" :key="j">
              <div
                class="x-toggle"
                @click="
                  toggleX(
                    modifiedRow.index,
                    j,
                    j === 0 ? 'l' : j === 1 ? 'r' : j === 2 ? 'b' : null
                  )
                "
              >
                <SvgRender
                  v-if="displayGrid[modifiedRow.index][j] === 'X'"
                  :width="20"
                  :height="20"
                  icon="x"
                />
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="1" class="text-center"></v-col>
        <v-col cols="1" class="text-center upper-level">
          <div class="mb-1">Lower T</div>
        </v-col>
        <v-col cols="11">
          <v-row
            v-for="modifiedRow in modifiedRows(14, 20)"
            :key="modifiedRow.index"
          >
            <v-col class="text-center">
              <div class="mb-1">
                <strong>{{ getRangeLabel(modifiedRow.row) }}</strong>
              </div>
            </v-col>
            <v-col v-for="(col, j) in cols" :key="j">
              <div
                class="x-toggle"
                @click="
                  toggleX(
                    modifiedRow.index,
                    j,
                    j === 0 ? 'l' : j === 1 ? 'r' : j === 2 ? 'b' : null
                  )
                "
              >
                <SvgRender
                  v-if="displayGrid[modifiedRow.index][j] === 'X'"
                  :width="20"
                  :height="20"
                  icon="x"
                />
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="1" class="text-center upper-level">
          <div class="mb-1">L-Levels</div>
        </v-col>
        <v-col cols="1" class="text-center upper-level">
          <div class="mb-1">Upper L</div>
        </v-col>
        <v-col cols="11">
          <v-row
            v-for="modifiedRow in modifiedRows(20, 22)"
            :key="modifiedRow.index"
          >
            <v-col class="text-center">
              <div class="mb-1">
                <strong>{{ getRangeLabel(modifiedRow.row) }}</strong>
              </div>
            </v-col>
            <v-col v-for="(col, j) in cols" :key="j">
              <div
                class="x-toggle"
                @click="
                  toggleX(
                    modifiedRow.index,
                    j,
                    j === 0 ? 'l' : j === 1 ? 'r' : j === 2 ? 'b' : null
                  )
                "
              >
                <SvgRender
                  v-if="displayGrid[modifiedRow.index][j] === 'X'"
                  :width="20"
                  :height="20"
                  icon="x"
                />
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="1" class="text-center"></v-col>
        <v-col cols="1" class="text-center upper-level">
          <div class="mb-1">Lower L</div>
        </v-col>
        <v-col cols="11">
          <v-row
            v-for="modifiedRow in modifiedRows(22, 25)"
            :key="modifiedRow.index"
          >
            <v-col class="text-center">
              <div class="mb-1">
                <strong>{{ getRangeLabel(modifiedRow.row) }}</strong>
              </div>
            </v-col>
            <v-col v-for="(col, j) in cols" :key="j">
              <div
                class="x-toggle"
                @click="
                  toggleX(
                    modifiedRow.index,
                    j,
                    j === 0 ? 'l' : j === 1 ? 'r' : j === 2 ? 'b' : null
                  )
                "
              >
                <SvgRender
                  v-if="displayGrid[modifiedRow.index][j] === 'X'"
                  :width="20"
                  :height="20"
                  icon="x"
                />
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="1" class="text-center upper-level">
          <div class="mb-1">S-Levels</div>
        </v-col>
        <v-col cols="1" class="text-center upper-level">
          <div class="mb-1">Upper S</div>
        </v-col>
        <v-col cols="11">
          <v-row
            v-for="modifiedRow in modifiedRows(25, 27)"
            :key="modifiedRow.index"
          >
            <v-col class="text-center">
              <div class="mb-1">
                <strong>{{ getRangeLabel(modifiedRow.row) }}</strong>
              </div>
            </v-col>
            <v-col v-for="(col, j) in cols" :key="j">
              <div
                class="x-toggle"
                @click="
                  toggleX(
                    modifiedRow.index,
                    j,
                    j === 0 ? 'l' : j === 1 ? 'r' : j === 2 ? 'b' : null
                  )
                "
              >
                <SvgRender
                  v-if="displayGrid[modifiedRow.index][j] === 'X'"
                  :width="20"
                  :height="20"
                  icon="x"
                />
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="1" class="text-center"></v-col>
        <v-col cols="1" class="text-center upper-level">
          <div class="mb-1">Lower S</div>
        </v-col>
        <v-col cols="11">
          <v-row
            v-for="modifiedRow in modifiedRows(27, 30)"
            :key="modifiedRow.index"
          >
            <v-col class="text-center">
              <div class="mb-1">
                <strong>{{ getRangeLabel(modifiedRow.row) }}</strong>
              </div>
            </v-col>
            <v-col v-for="(col, j) in cols" :key="j">
              <div
                class="x-toggle"
                @click="
                  toggleX(
                    modifiedRow.index,
                    j,
                    j === 0 ? 'l' : j === 1 ? 'r' : j === 2 ? 'b' : null
                  )
                "
              >
                <SvgRender
                  v-if="displayGrid[modifiedRow.index][j] === 'X'"
                  :width="20"
                  :height="20"
                  icon="x"
                />
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { spinalLevels, booleanColumns } from '../helpers/noteArrays';

export default {
  props: {
    existingData: {
      type: Object,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      booleanColumns: [],
      dialog: true,
      valid: true,
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
      grid: Array.from({ length: 30 }, () => Array(11).fill(null)),
      answerGrid: Array.from({ length: 30 }, () => Array(9).fill(null)),
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
          if (this.cols.includes(this.cols[index])) {
            return cell ? 'X' : '';
          }
          return cell;
        });
      });
    },
  },
  mounted() {
    this.booleanColumns = booleanColumns;
    if (this.existingData) {
      for (const entry of this.existingData) {
        if (entry) {
          const rowIndex = spinalLevels.findIndex(
            (row) => row.toLowerCase() === entry.spinalLevel
          );
          this.booleanColumns.forEach((col, colIndex) => {
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
          const rowIndex = spinalLevels.findIndex(
            (row) => row.toLowerCase() === entry.spinalLevel
          );
          this.cols.forEach((col, colIndex) => {
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
    this.$emit('update:spinalGrid', this.answerGrid);
  },
  methods: {
    handleSelectChange(rowIndex, colIndex, value) {
      // Update the value in the grid
      this.$set(this.grid[rowIndex], colIndex, value === '' ? null : value);

      // Emit the updated grid to the parent component
      this.$emit('update:spinalTreatmentGrid', this.grid);
    },
    getRangeLabel(row) {
      return row.toUpperCase().replace('_', ' - ');
    },
    modifiedRows(slice1, slice2) {
      return spinalLevels.slice(slice1, slice2).map((row, index) => {
        return { row, index: slice1 + index };
      });
    },
    toggleX(i, j, sideOption = null) {
      if (j >= 0 && j <= 2) {
        if (this.grid[i][j] === 'X' || this.grid[i][j]) {
          for (let col = 0; col < this.grid[i].length; col++) {
            this.grid[i][col] = false;
            this.answerGrid[i][col] = false;
          }
          this.$emit('update:spinalGrid', this.answerGrid);
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

      this.$emit('update:spinalGrid', this.answerGrid);
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
  overflow-y: auto;
}
.scrollable-content {
  max-height: 50vh;
  overflow-y: auto;
  padding-top: 15px;
}
.v-text-field {
  width: 100%;
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
  padding: 10px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.upper-level {
  font-weight: 700;
  font-size: 20px;
  /* transform: rotate(270deg); */
  border-top: 1px solid white;
}
</style>
