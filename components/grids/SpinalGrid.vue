<template>
  <div class="grid-container">
    <v-row class="header-row text-center">
      <v-col></v-col>
      <v-col></v-col> <!-- Additional column for the extra label -->
      <v-col></v-col> <!-- Original empty column -->
      <v-col v-for="(col, j) in cols" :key="j">
        <div class="mb-1 rotate"><strong>{{ col }}</strong></div>
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
          <v-row v-for="(row, i) in rows.slice(0, 1)" :key="i">
            <v-col class="text-center static-col grid-cell">
              <div class="mb-1"><strong>{{ getRangeLabel(row, i) }}</strong></div>
            </v-col>
            <v-col v-for="(col, j) in cols" :key="j" class="grid-cell">
              <div>{{ getValue(i, j) }}</div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="1" class="text-center static-col outer-group-mid "></v-col>
        <v-col cols="1" class="text-center static-col extra-info-group">
          <div class="mb-1">Upper Cerv</div>
        </v-col>
        <v-col cols="10">
          <v-row v-for="(row, i) in rows.slice(1, 3)" :key="i">
            <v-col class="text-center static-col grid-cell">
              <div class="mb-1"><strong>{{ getRangeLabel(row, i) }}</strong></div>
            </v-col>
            <v-col v-for="(col, j) in cols" :key="j" class="grid-cell">
              <div>{{ getValue(i, j) }}</div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="1" class="text-center static-col outer-group-mid">C-Levels</v-col>
        <v-col cols="1" class="text-center static-col extra-info-group">
          <div class="mb-1">Mid Cerv</div>
        </v-col>
        <v-col cols="10">
          <v-row v-for="(row, i) in rows.slice(3, 5)" :key="i">
            <v-col class="text-center static-col grid-cell">
              <div class="mb-1"><strong>{{ getRangeLabel(row, i) }}</strong></div>
            </v-col>
            <v-col v-for="(col, j) in cols" :key="j" class="grid-cell">
              <div>{{ getValue(i, j) }}</div>
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
          <v-row v-for="(row, i) in rows.slice(5, 8)" :key="i">
            <v-col class="text-center static-col grid-cell">
              <div class="mb-1"><strong>{{ getRangeLabel(row, i) }}</strong></div>
            </v-col>
            <v-col v-for="(col, j) in cols" :key="j" class="grid-cell">
              <div>{{ getValue(i, j) }}</div>
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
          <v-row v-for="(row, i) in rows.slice(8, 10)" :key="i">
            <v-col class="text-center static-col grid-cell">
              <div class="mb-1"><strong>{{ getRangeLabel(row, i) }}</strong></div>
            </v-col>
            <v-col v-for="(col, j) in cols" :key="j" class="grid-cell">
              <div>{{ getValue(i + 7, j) }}</div>
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
          <v-row v-for="(row, i) in rows.slice(10, 14)" :key="i">
            <v-col class="text-center static-col grid-cell">
              <div class="mb-1"><strong>{{ getRangeLabel(row, i) }}</strong></div>
            </v-col>
            <v-col v-for="(col, j) in cols" :key="j" class="grid-cell">
              <div>{{ getValue(i + 7, j) }}</div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="1" class="text-center static-col outer-group-low">T Levels</v-col>
        <v-col cols="1" class="text-center static-col extra-info-group">
          <div class="mb-1">Lower T</div>
        </v-col>
        <v-col cols="10">
          <v-row v-for="(row, i) in rows.slice(14, 20)" :key="i">
            <v-col class="text-center static-col grid-cell">
              <div class="mb-1"><strong>{{ getRangeLabel(row, i) }}</strong></div>
            </v-col>
            <v-col v-for="(col, j) in cols" :key="j" class="grid-cell">
              <div>{{ getValue(i + 7, j) }}</div>
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
          <v-row v-for="(row, i) in rows.slice(20, 22)" :key="i">
            <v-col class="text-center static-col grid-cell">
              <div class="mb-1"><strong>{{ getRangeLabel(row, i) }}</strong></div>
            </v-col>
            <v-col v-for="(col, j) in cols" :key="j" class="grid-cell">
              <div>{{ getValue(i + 19, j) }}</div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="1" class="text-center static-col outer-group-low">L Levels</v-col>
        <v-col cols="1" class="text-center static-col extra-info-group">
          <div class="mb-1">Lower L</div>
        </v-col>
        <v-col cols="10">
          <v-row v-for="(row, i) in rows.slice(22, 25)" :key="i">
            <v-col class="text-center static-col grid-cell">
              <div class="mb-1"><strong>{{ getRangeLabel(row, i) }}</strong></div>
            </v-col>
            <v-col v-for="(col, j) in cols" :key="j" class="grid-cell">
              <div>{{ getValue(i + 19, j) }}</div>
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
          <v-row v-for="(row, i) in rows.slice(25, 27)" :key="i">
            <v-col class="text-center static-col grid-cell">
              <div class="mb-1"><strong>{{ getRangeLabel(row, i) }}</strong></div>
            </v-col>
            <v-col v-for="(col, j) in cols" :key="j" class="grid-cell">
              <div>{{ getValue(i + 24, j) }}</div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="1" class="text-center static-col outer-group-low">S Levels</v-col>
        <v-col cols="1" class="text-center static-col extra-info-group">
          <div class="mb-1">Lower S</div>
        </v-col>
        <v-col cols="10">
          <v-row v-for="(row, i) in rows.slice(27, 30)" :key="i">
            <v-col class="text-center static-col grid-cell">
              <div class="mb-1"><strong>{{ getRangeLabel(row, i) }}</strong></div>
            </v-col>
            <v-col v-for="(col, j) in cols" :key="j" class="grid-cell">
              <div>{{ getValue(i + 24, j) }}</div>
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
      entries: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
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
        ],
        cols: ['Left', 'Right', 'Both', 'Subluxation', 'Muscle Spasm', 'Trigger Points', 'Tenderness', 'Numbness', 'Edema', 'Swelling', 'Reduced Motion'],
        mapColsToFields: {
          'Left': 'side',
          'Right': 'side',
          'Both': 'side',
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

      getRangeLabel(row, i) {
          return row.toUpperCase().replace("_", " - ");
      },
      getValue(i, j) {
        const entry = this.entries.find(entry => entry.spinalLevel?.toLowerCase() === this.rows[i]?.toLowerCase());
        if (!entry) return '';

        const fieldName = this.mapColsToFields[this.cols[j]];
        const value = entry[fieldName];

        if (this.booleanFields.includes(fieldName)) {
          return value ? 'X' : '';
        }

        return this.getDisplayedValue(value, this.cols[j]);
      },
      getDisplayedValue(value, colName) {
        if (colName === 'Left' && value === 'l') return 'X';
        if (colName === 'Right' && value === 'r') return 'X';
        if (colName === 'Both' && value === 'b') return 'X';

        if ((value === 'l' && colName === 'Right') || (value === 'l' && colName === 'Both')) {
          return ''
        } else if ((value === 'r' && colName === 'Left') || (value === 'r' && colName === 'Both')) {
          return ''
        } else if ((value === 'b' && colName === 'Left') || (value === 'b' && colName === 'Right')) {
          return '';
        }
        
        return value;
      },
    }
  }
  </script>

<style scoped>

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
</style>