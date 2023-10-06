<template>
    <div class="grid-container">
      <v-row class="header-row text-center">
        <v-col></v-col>
        <v-col class=" pl-5" v-for="(col, j) in cols" :key="j">
          <div v-if="!(col === 'R' || col === 'L' || col === 'B')" class="mb-1 pt-9 rotate label"><strong>{{ col }}</strong></div>
          <div v-else-if="col === 'L'" >
            <div class="rotate label"><strong></strong></div>
            <div class="mb-1 label">
              <strong>{{ col }}</strong>
            </div>
          </div>
          <div v-else-if="col === 'B'" >
            <div class="rotate label"><strong></strong></div>
            <div class="mb-1 label">
              <strong>{{ col }}</strong>
            </div>
          </div>
          <div v-else >
            <div class="label rotate pt-8 pr-9"><strong>Sides</strong></div>
            <div class="mb-1 label">
              <strong>{{ col }}</strong>
            </div>
          </div>
        </v-col>
      </v-row>
      <div class="scrollable-content">
        <v-row v-for="(row, i) in rows" :key="i">
      <v-col class="text-center static-col grid-cell">
        <div class="mb-1"><strong>{{ row }}</strong></div>
      </v-col>
      <v-col v-for="(col, j) in cols" :key="j" class="grid-cell" :class="{'even-col': j % 2 === 0, 'odd-col': j % 2 !== 0}">
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
        required: true
      }
    },
    data() {
      return {
        rows: ['Shoulder', 'Arm', 'Bicep', 'Tricep', 'Elbow', 'Wrist', 'Hand', 'Hip', 'Thigh', 'Leg', 'Knee', 'Ankle', 'Foot'],
        cols: ['L', 'R', 'B', 'Subluxation', 'Muscle Spasm', 'Trigger Points', 'Tenderness', 'Numbness', 'Edema', 'Swelling', 'Reduced Motion'],
        mapColsToFields: {
          'L': 'side',
          'R': 'side',
          'B': 'side',
          'Subluxation': 'sublux',
          'Muscle Spasm': 'muscleSpasm',
          'Trigger Points': 'triggerPoints',
          'Tenderness': 'tenderness',
          'Numbness': 'numbness',
          'Edema': 'edema',
          'Swelling': 'swelling',
          'Reduced Motion': 'reducedMotion',
        },
        booleanFields: ['sublux', 'muscleSpasm', 'triggerPoints', 'tenderness', 'numbness', 'edema', 'swelling', 'reducedMotion'],

      };
    },
    methods: {
      getValue(i, j) {
        const entry = this.entries.find(entry => entry.extremityLevel?.toLowerCase() === this.rows[i]?.toLowerCase());
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

        if ((value === 'l' && colName === 'R') || (value === 'l' && colName === 'B')) {
          return ''
        } else if ((value === 'r' && colName === 'L') || (value === 'r' && colName === 'B')) {
          return ''
        } else if ((value === 'b' && colName === 'L') || (value === 'b' && colName === 'R')) {
          return '';
        }

        return value;
      },
    }
  }
  </script>

<style scoped>
.odd-col {
  background-color: #474747;
}

.rotate {
  transform: rotate(90deg);
  white-space: normal; 
  line-height: 1.2;
  height: 80px;   
  width: 100px;  
  overflow: hidden;
  /* padding-top: 15px; */
  text-align: center; /* Centers the header text */
}
.grid-cell {
  border: 1px solid gray; /* Change color and thickness as desired */
  text-align: center;
  padding-top: 25px;
}

.grouped-cell {
  /* Add styling specific to the grouped cell */
  border-bottom: 1px solid gray;
}

.extra-info-group {
  border: 1px solid gray;
  display: flex;
  align-items: center;
  justify-content: center;
  /* min-height: calc(1.5rem * 5); Adjust height as needed */
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
    font-size: 12px ;
  }

  .rotate {
    width: 100% !important;
  }
}


</style>