<template>
  <div class="grid-container">
    <v-row>
      <v-col cols="1" class="text-center pb-8"></v-col>
      <v-col cols="1" class="text-center"> </v-col>
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
        <v-col cols="1" class="text-center outer-group-top"></v-col>
        <v-col cols="1" class="text-center extra-info-group">
          <div class="mb-1">Sub Occ</div>
        </v-col>
        <v-col cols="10">
          <v-row v-for="(row, i) in spinalLevels.slice(0, 1)" :key="i">
            <v-col class="text-center grid-cell">
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
              <div v-if="getValue(i, j) === 'X'">
                <SvgRender :width="15" :height="15" icon="x" />
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="1" class="text-center outer-group-mid"></v-col>
        <v-col cols="1" class="text-center extra-info-group">
          <div class="mb-1">Upper Cerv</div>
        </v-col>
        <v-col cols="10">
          <v-row v-for="(row, i) in spinalLevels.slice(1, 3)" :key="i">
            <v-col class="text-center grid-cell">
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
              <div v-if="getValue(i + 1, j) === 'X'">
                <SvgRender :width="15" :height="15" icon="x" />
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="1" class="text-center outer-group-mid">C-Levels</v-col>
        <v-col cols="1" class="text-center extra-info-group">
          <div class="mb-1">Mid Cerv</div>
        </v-col>
        <v-col cols="10">
          <v-row v-for="(row, i) in spinalLevels.slice(3, 5)" :key="i">
            <v-col class="text-center grid-cell">
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
              <div v-if="getValue(i + 3, j) === 'X'">
                <SvgRender :width="15" :height="15" icon="x" />
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="1" class="text-center outer-group-low"></v-col>
        <v-col cols="1" class="text-center extra-info-group">
          <div class="mb-1">Lower Cerv</div>
        </v-col>
        <v-col cols="10">
          <v-row v-for="(row, i) in spinalLevels.slice(5, 8)" :key="i">
            <v-col class="text-center grid-cell">
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
              <div v-if="getValue(i + 5, j) === 'X'">
                <SvgRender :width="15" :height="15" icon="x" />
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <!-- T Levels Group -->
      <v-row>
        <v-col cols="1" class="text-center outer-group-top"></v-col>
        <v-col cols="1" class="text-center extra-info-group">
          <div class="mb-1">Upper T</div>
        </v-col>
        <v-col cols="10">
          <v-row v-for="(row, i) in spinalLevels.slice(8, 10)" :key="i">
            <v-col class="text-center grid-cell">
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
              <div v-if="getValue(i + 8, j) === 'X'">
                <SvgRender :width="15" :height="15" icon="x" />
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="1" class="text-center outer-group-mid"></v-col>
        <v-col cols="1" class="text-center extra-info-group">
          <div class="mb-1">Mid T</div>
        </v-col>
        <v-col cols="10">
          <v-row v-for="(row, i) in spinalLevels.slice(10, 14)" :key="i">
            <v-col class="text-center grid-cell">
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
              <div v-if="getValue(i + 10, j) === 'X'">
                <SvgRender :width="15" :height="15" icon="x" />
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="1" class="text-center outer-group-low">T Levels</v-col>
        <v-col cols="1" class="text-center extra-info-group">
          <div class="mb-1">Lower T</div>
        </v-col>
        <v-col cols="10">
          <v-row v-for="(row, i) in spinalLevels.slice(14, 20)" :key="i">
            <v-col class="text-center grid-cell">
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
              <div v-if="getValue(i + 14, j) === 'X'">
                <SvgRender :width="15" :height="15" icon="x" />
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <!-- L Levels Group -->
      <v-row>
        <v-col cols="1" class="text-center outer-group-top"></v-col>
        <v-col cols="1" class="text-center extra-info-group">
          <div class="mb-1">Upper L</div>
        </v-col>
        <v-col cols="10">
          <v-row v-for="(row, i) in spinalLevels.slice(20, 22)" :key="i">
            <v-col class="text-center grid-cell">
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
              <div v-if="getValue(i + 20, j) === 'X'">
                <SvgRender :width="15" :height="15" icon="x" />
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="1" class="text-center outer-group-low">L Levels</v-col>
        <v-col cols="1" class="text-center extra-info-group">
          <div class="mb-1">Lower L</div>
        </v-col>
        <v-col cols="10">
          <v-row v-for="(row, i) in spinalLevels.slice(22, 25)" :key="i">
            <v-col class="text-center grid-cell">
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
              <div v-if="getValue(i + 22, j) === 'X'">
                <SvgRender :width="15" :height="15" icon="x" />
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <!-- S Levels Group -->
      <v-row>
        <v-col cols="1" class="text-center outer-group-top"></v-col>
        <v-col cols="1" class="text-center extra-info-group">
          <div class="mb-1">Upper S</div>
        </v-col>
        <v-col cols="10">
          <v-row v-for="(row, i) in spinalLevels.slice(25, 27)" :key="i">
            <v-col class="text-center grid-cell">
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
              <div v-if="getValue(i + 25, j) === 'X'">
                <SvgRender :width="15" :height="15" icon="x" />
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="1" class="text-center outer-group-low">S Levels</v-col>
        <v-col cols="1" class="text-center extra-info-group">
          <div class="mb-1">Lower S</div>
        </v-col>
        <v-col cols="10">
          <v-row v-for="(row, i) in spinalLevels.slice(27, 30)" :key="i">
            <v-col class="text-center grid-cell">
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
              <div v-if="getValue(i + 27, j) === 'X'">
                <SvgRender :width="15" :height="15" icon="x" />
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
    entries: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      spinalLevels: [],
      cols: [
        'L',
        'R',
        'B',
        'Subluxation',
        'Muscle Spasm',
        'Trigger Points',
        'Tenderness',
        'Numbness',
        'Edema',
        'Swelling',
        'Reduced Motion',
      ],
      mapColsToFields: {
        L: 'side',
        R: 'side',
        B: 'side',
        Subluxation: 'sublux',
        'Muscle Spasm': 'muscleSpasm',
        'Trigger Points': 'triggerPoints',
        Tenderness: 'tenderness',
        Numbness: 'numbness',
        Edema: 'edema',
        Swelling: 'swelling',
        'Reduced Motion': 'reducedMotion',
      },
      booleanFields: [
        'sublux',
        'muscleSpasm',
        'triggerPoints',
        'tenderness',
        'numbness',
        'edema',
        'swelling',
        'reducedMotion',
      ],
    };
  },
  mounted() {
    this.spinalLevels = spinalLevels;
  },
  methods: {
    getRangeLabel(row) {
      return row.toUpperCase().replace('_', ' - ');
    },
    getValue(i, j) {
      const entry = this.entries.find(
        (entry) =>
          entry.spinalLevel?.toLowerCase() === spinalLevels[i]?.toLowerCase()
      );

      if (!entry) return '';

      const fieldName = this.mapColsToFields[this.cols[j]];
      const value = entry[fieldName];

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
  padding-top: 10px;
  text-align: center;
  min-width: 15px !important;
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
