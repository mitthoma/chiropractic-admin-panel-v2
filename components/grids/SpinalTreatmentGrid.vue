<template>
  <div class="grid-container">
    <v-row>
      <v-col cols="1" class="text-center static-col pb-8"></v-col>
      <v-col cols="1" class="text-center static-col"> </v-col>
      <v-col cols="10">
        <v-row
          v-for="(row, i) in spinalLevels.slice(0, 1)"
          :key="i"
          class="mb-12"
        >
          <v-col class="text-center grid-cell grid-cell-heading"> </v-col>
          <v-col
            v-for="(col, j) in cols"
            :key="j"
            class="grid-cell grid-cell-heading text-center"
          >
            <div
              v-if="!(col === 'R' || col === 'L' || col === 'B')"
              class="rotate pl-8 text-center"
            >
              <strong>{{ col }}</strong>
            </div>
            <div v-else-if="col === 'R'" class="text-center rotate pl-8">
              <strong>Right</strong>
            </div>
            <div v-else-if="col === 'L'" class="text-center rotate pl-8">
              <strong>Left</strong>
            </div>
            <div v-else-if="col === 'B'" class="text-center rotate pl-8">
              <strong>Both</strong>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <div class="scrollable-content mt-5">
      <!-- C Levels  -->
      <v-row>
        <v-col cols="1" class="text-center static-col outer-group-top"></v-col>
        <v-col cols="1" class="text-center static-col extra-info-group">
          <div class="mb-1">Sub Occ</div>
        </v-col>
        <v-col cols="10">
          <v-row v-for="(row, i) in spinalLevels.slice(0, 1)" :key="i">
            <v-col class="text-center static-col grid-cell">
              <div class="mb-1">
                <strong>{{ getRangeLabel(row, i) }}</strong>
              </div>
            </v-col>
            <v-col
              v-for="(col, j) in cols"
              :key="j"
              class="grid-cell"
              :class="['grid-cell', { 'alternating-bg': j % 2 === 0 }]"
            >
              <div v-if="getValue(i, j) === 'X' || getValue(i, j)">
                <SvgRender
                  v-if="getValue(i, j) === 'X'"
                  :width="20"
                  :height="20"
                  icon="x"
                />
                <div v-else class="font-weight-bold">{{ getValue(i, j) }}</div>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="1" class="text-center static-col outer-group-mid"></v-col>
        <v-col cols="1" class="text-center static-col extra-info-group">
          <div class="mb-1">Upper Cerv</div>
        </v-col>
        <v-col cols="10">
          <v-row v-for="(row, i) in spinalLevels.slice(1, 3)" :key="i">
            <v-col class="text-center static-col grid-cell">
              <div class="mb-1">
                <strong>{{ getRangeLabel(row) }}</strong>
              </div>
            </v-col>
            <v-col
              v-for="(col, j) in cols"
              :key="j"
              class="grid-cell"
              :class="['grid-cell', { 'alternating-bg': j % 2 === 0 }]"
            >
              <div v-if="getValue(i + 1, j) === 'X' || getValue(i + 1, j)">
                <SvgRender
                  v-if="getValue(i + 1, j) === 'X'"
                  :width="20"
                  :height="20"
                  icon="x"
                />
                <div v-else class="font-weight-bold">
                  {{ getValue(i + 1, j) }}
                </div>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="1" class="text-center static-col outer-group-mid"
          >C-Levels</v-col
        >
        <v-col cols="1" class="text-center static-col extra-info-group">
          <div class="mb-1">Mid Cerv</div>
        </v-col>
        <v-col cols="10">
          <v-row v-for="(row, i) in spinalLevels.slice(3, 5)" :key="i">
            <v-col class="text-center static-col grid-cell">
              <div class="mb-1">
                <strong>{{ getRangeLabel(row) }}</strong>
              </div>
            </v-col>
            <v-col
              v-for="(col, j) in cols"
              :key="j"
              class="grid-cell"
              :class="['grid-cell', { 'alternating-bg': j % 2 === 0 }]"
            >
              <div v-if="getValue(i + 3, j) === 'X' || getValue(i + 3, j)">
                <SvgRender
                  v-if="getValue(i + 3, j) === 'X'"
                  :width="20"
                  :height="20"
                  icon="x"
                />
                <div v-else class="font-weight-bold">
                  {{ getValue(i + 3, j) }}
                </div>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="1" class="text-center static-col outer-group-low"></v-col>
        <v-col cols="1" class="text-center static-col extra-info-group">
          <div class="mb-1">Lower Cerv</div>
        </v-col>
        <v-col cols="10">
          <v-row v-for="(row, i) in spinalLevels.slice(5, 8)" :key="i">
            <v-col class="text-center static-col grid-cell">
              <div class="mb-1">
                <strong>{{ getRangeLabel(row) }}</strong>
              </div>
            </v-col>
            <v-col
              v-for="(col, j) in cols"
              :key="j"
              class="grid-cell"
              :class="['grid-cell', { 'alternating-bg': j % 2 === 0 }]"
            >
              <div v-if="getValue(i + 5, j) === 'X' || getValue(i + 5, j)">
                <SvgRender
                  v-if="getValue(i + 5, j) === 'X'"
                  :width="20"
                  :height="20"
                  icon="x"
                />
                <div v-else class="font-weight-bold">
                  {{ getValue(i + 5, j) }}
                </div>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <!-- T Levels Group -->
      <v-row>
        <v-col cols="1" class="text-center static-col outer-group-top"></v-col>
        <v-col cols="1" class="text-center static-col extra-info-group">
          <div class="mb-1">Upper T</div>
        </v-col>
        <v-col cols="10">
          <v-row v-for="(row, i) in spinalLevels.slice(8, 10)" :key="i">
            <v-col class="text-center static-col grid-cell">
              <div class="mb-1">
                <strong>{{ getRangeLabel(row) }}</strong>
              </div>
            </v-col>
            <v-col
              v-for="(col, j) in cols"
              :key="j"
              class="grid-cell"
              :class="['grid-cell', { 'alternating-bg': j % 2 === 0 }]"
            >
              <div v-if="getValue(i + 8, j) === 'X' || getValue(i + 8, j)">
                <SvgRender
                  v-if="getValue(i + 8, j) === 'X'"
                  :width="20"
                  :height="20"
                  icon="x"
                />
                <div v-else class="font-weight-bold">
                  {{ getValue(i + 8, j) }}
                </div>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="1" class="text-center static-col outer-group-mid"></v-col>
        <v-col cols="1" class="text-center static-col extra-info-group">
          <div class="mb-1">Mid T</div>
        </v-col>
        <v-col cols="10">
          <v-row v-for="(row, i) in spinalLevels.slice(10, 14)" :key="i">
            <v-col class="text-center static-col grid-cell">
              <div class="mb-1">
                <strong>{{ getRangeLabel(row) }}</strong>
              </div>
            </v-col>
            <v-col
              v-for="(col, j) in cols"
              :key="j"
              class="grid-cell"
              :class="['grid-cell', { 'alternating-bg': j % 2 === 0 }]"
            >
              <div v-if="getValue(i + 10, j) === 'X' || getValue(i + 10, j)">
                <SvgRender
                  v-if="getValue(i + 10, j) === 'X'"
                  :width="20"
                  :height="20"
                  icon="x"
                />
                <div v-else class="font-weight-bold">
                  {{ getValue(i + 10, j) }}
                </div>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="1" class="text-center static-col outer-group-low"
          >T Levels</v-col
        >
        <v-col cols="1" class="text-center static-col extra-info-group">
          <div class="mb-1">Lower T</div>
        </v-col>
        <v-col cols="10">
          <v-row v-for="(row, i) in spinalLevels.slice(14, 20)" :key="i">
            <v-col class="text-center static-col grid-cell">
              <div class="mb-1">
                <strong>{{ getRangeLabel(row) }}</strong>
              </div>
            </v-col>
            <v-col
              v-for="(col, j) in cols"
              :key="j"
              class="grid-cell"
              :class="['grid-cell', { 'alternating-bg': j % 2 === 0 }]"
            >
              <div v-if="getValue(i + 14, j) === 'X' || getValue(i + 14, j)">
                <SvgRender
                  v-if="getValue(i + 14, j) === 'X'"
                  :width="20"
                  :height="20"
                  icon="x"
                />
                <div v-else class="font-weight-bold">
                  {{ getValue(i + 14, j) }}
                </div>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <!-- L Levels Group -->
      <v-row>
        <v-col cols="1" class="text-center static-col outer-group-top"></v-col>
        <v-col cols="1" class="text-center static-col extra-info-group">
          <div class="mb-1">Upper L</div>
        </v-col>
        <v-col cols="10">
          <v-row v-for="(row, i) in spinalLevels.slice(20, 22)" :key="i">
            <v-col class="text-center static-col grid-cell">
              <div class="mb-1">
                <strong>{{ getRangeLabel(row) }}</strong>
              </div>
            </v-col>
            <v-col
              v-for="(col, j) in cols"
              :key="j"
              class="grid-cell"
              :class="['grid-cell', { 'alternating-bg': j % 2 === 0 }]"
            >
              <div v-if="getValue(i + 20, j) === 'X' || getValue(i + 20, j)">
                <SvgRender
                  v-if="getValue(i + 20, j) === 'X'"
                  :width="20"
                  :height="20"
                  icon="x"
                />
                <div v-else class="font-weight-bold">
                  {{ getValue(i + 20, j) }}
                </div>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="1" class="text-center static-col outer-group-low"
          >L Levels</v-col
        >
        <v-col cols="1" class="text-center static-col extra-info-group">
          <div class="mb-1">Lower L</div>
        </v-col>
        <v-col cols="10">
          <v-row v-for="(row, i) in spinalLevels.slice(22, 25)" :key="i">
            <v-col class="text-center static-col grid-cell">
              <div class="mb-1">
                <strong>{{ getRangeLabel(row) }}</strong>
              </div>
            </v-col>
            <v-col
              v-for="(col, j) in cols"
              :key="j"
              class="grid-cell"
              :class="['grid-cell', { 'alternating-bg': j % 2 === 0 }]"
            >
              <div v-if="getValue(i + 22, j) === 'X' || getValue(i + 22, j)">
                <SvgRender
                  v-if="getValue(i + 22, j) === 'X'"
                  :width="20"
                  :height="20"
                  icon="x"
                />
                <div v-else class="font-weight-bold">
                  {{ getValue(i + 22, j) }}
                </div>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <!-- S Levels Group -->
      <v-row>
        <v-col cols="1" class="text-center static-col outer-group-top"></v-col>
        <v-col cols="1" class="text-center static-col extra-info-group">
          <div class="mb-1">Upper S</div>
        </v-col>
        <v-col cols="10">
          <v-row v-for="(row, i) in spinalLevels.slice(25, 27)" :key="i">
            <v-col class="text-center static-col grid-cell">
              <div class="mb-1">
                <strong>{{ getRangeLabel(row) }}</strong>
              </div>
            </v-col>
            <v-col
              v-for="(col, j) in cols"
              :key="j"
              class="grid-cell"
              :class="['grid-cell', { 'alternating-bg': j % 2 === 0 }]"
            >
              <div v-if="getValue(i + 25, j) === 'X' || getValue(i + 25, j)">
                <SvgRender
                  v-if="getValue(i + 25, j) === 'X'"
                  :width="20"
                  :height="20"
                  icon="x"
                />
                <div v-else class="font-weight-bold">
                  {{ getValue(i + 25, j) }}
                </div>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="1" class="text-center static-col outer-group-low"
          >S Levels</v-col
        >
        <v-col cols="1" class="text-center static-col extra-info-group">
          <div class="mb-1">Lower S</div>
        </v-col>
        <v-col cols="10">
          <v-row v-for="(row, i) in spinalLevels.slice(27, 30)" :key="i">
            <v-col class="text-center static-col grid-cell">
              <div class="mb-1">
                <strong>{{ getRangeLabel(row) }}</strong>
              </div>
            </v-col>
            <v-col
              v-for="(col, j) in cols"
              :key="j"
              class="grid-cell"
              :class="['grid-cell', { 'alternating-bg': j % 2 === 0 }]"
            >
              <div v-if="getValue(i + 27, j) === 'X' || getValue(i + 27, j)">
                <SvgRender
                  v-if="getValue(i + 27, j) === 'X'"
                  :width="20"
                  :height="20"
                  icon="x"
                />
                <div v-else class="font-weight-bold">
                  {{ getValue(i + 27, j) }}
                </div>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { spinalLevels } from '../dialogs/helpers/noteArrays';
export default {
  props: {
    treatments: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      cols: [
        'L',
        'R',
        'B',
        'Physio Positioning',
        'Cold Pack',
        'Hot Pack',
        'Elect Stim',
        'Traction',
        'Massage',
        'Positioning',
        'Technique',
        'Manipulation',
      ],
      mapColsToFields: {
        L: 'side',
        R: 'side',
        B: 'side',
        'Physio Positioning': 'physioPositioning',
        'Cold Pack': 'coldPack',
        'Hot Pack': 'hotPack',
        'Elect Stim': 'electStim',
        Traction: 'traction',
        Massage: 'massage',
        Positioning: 'treatmentPositioning',
        Technique: 'treatmentTechnique',
        Manipulation: 'treatmentManipulation',
      },
      booleanFields: [
        'coldPack',
        'hotPack',
        'electStim',
        'traction',
        'massage',
        'treatmentManipulation',
      ],
    };
  },
  methods: {
    getRangeLabel(row) {
      return row.toUpperCase().replace('_', ' - ');
    },
    getValue(i, j) {
      const treatment = this.treatments.find(
        (treatment) =>
          treatment.spinalLevel?.toLowerCase() ===
          spinalLevels[i]?.toLowerCase()
      );

      if (!treatment) return '';

      const fieldName = this.mapColsToFields[this.cols[j]];
      const value = treatment[fieldName];

      if (this.booleanFields.includes(fieldName)) {
        return value ? 'X' : '';
      }

      return this.getDisplayedValue(value, this.cols[j]);
    },
    getDisplayedValue(value, colName) {
      if (colName === 'L' && value === 'l') return 'X';
      if (colName === 'R' && value === 'r') return 'X';
      if (colName === 'B' && value === 'b') return 'X';

      if (
        (value === 'l' && colName === 'R') ||
        (value === 'l' && colName === 'B')
      ) {
        return '';
      } else if (
        (value === 'r' && colName === 'L') ||
        (value === 'r' && colName === 'B')
      ) {
        return '';
      } else if (
        (value === 'b' && colName === 'L') ||
        (value === 'b' && colName === 'R')
      ) {
        return '';
      }

      return value;
    },
  },
};
</script>

<style scoped>
.v-container {
  max-width: 100% !important;
}

.grid-container {
  padding: 0 !important;
  margin: 0 !important;
}

.rotate {
  transform: rotate(90deg);
  white-space: nowrap;
  overflow-x: visible;
  text-align: center;
}
.grid-cell {
  border: 1px solid gray;
  padding-top: 20px;
  text-align: center;
  min-width: 20px !important;
}

.grid-cell-heading {
  min-height: 120px !important;
  border: none !important;
}

.grouped-cell {
  border-bottom: 1px solid gray;
}

.extra-info-group {
  border: 1px solid gray;
  display: flex;
  align-items: center;
  justify-content: center;
}

#sides-label {
  padding-top: 5%;
  padding-bottom: 5%;
}

.alternating-bg {
  background-color: #474747;
}

.outer-group-top {
  border-top: 1px solid gray;
  border-left: 1px solid gray;
}

.outer-group-mid {
  border-left: 1px solid gray;
}

.outer-group-low {
  border-left: 1px solid gray;
  border-bottom: 1px solid gray;
}

@media (max-width: 1920px) {
  .label {
    font-size: 12px;
  }

  .rotate {
    width: 100% !important;
  }
}
</style>
