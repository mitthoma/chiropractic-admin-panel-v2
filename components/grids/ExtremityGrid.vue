<template>
  <div class="grid-container">
    <v-row>
      <v-col></v-col>
      <v-col cols="12" class="mb-8">
        <v-row v-for="(row, i) in rows.slice(0, 1)" :key="i">
          <v-col class="grid-cell grid-cell-heading"> </v-col>
          <v-col
            v-for="(col, j) in cols"
            :key="j"
            class="grid-cell grid-cell-heading"
          >
            <div
              v-if="!(col === 'R' || col === 'L' || col === 'B')"
              class="rotate"
            >
              <strong>{{ col }}</strong>
            </div>
            <div v-else-if="col === 'R'" class="text-center rotate">
              <strong>Right</strong>
            </div>
            <div v-else-if="col === 'L'" class="text-center rotate">
              <strong>Left</strong>
            </div>
            <div v-else-if="col === 'B'" class="text-center rotate">
              <strong>Both</strong>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <div class="scrollable-content">
      <v-row v-for="(row, i) in rows" :key="i">
        <v-col class="text-center static-col grid-cell">
          <div class="mb-1">
            <strong>{{ row }}</strong>
          </div>
        </v-col>
        <v-col
          v-for="(col, j) in cols"
          :key="j"
          class="grid-cell"
          :class="{ 'even-col': j % 2 === 0, 'odd-col': j % 2 !== 0 }"
        >
          <div v-if="getValue(i, j) === 'X'">
            <SvgRender :width="20" :height="20" icon="x" />
          </div>
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
      required: true,
    },
  },
  data() {
    return {
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
  methods: {
    getValue(i, j) {
      const entry = this.entries.find(
        (entry) =>
          entry.extremityLevel?.toLowerCase() === this.rows[i]?.toLowerCase()
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
.odd-col {
  background-color: #474747;
}

.rotate {
  transform: rotate(90deg);
  white-space: nowrap;
  overflow-x: visible;
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
