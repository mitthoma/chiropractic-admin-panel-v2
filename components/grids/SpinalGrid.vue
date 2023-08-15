<template>
  <div class="grid-container">
    <v-row class="header-row text-center">
      <v-col></v-col> <!-- Additional column for the extra label -->
      <v-col></v-col> <!-- Original empty column -->
      <v-col v-for="(col, j) in cols" :key="j">
        <div class="mb-1 rotate"><strong>{{ col }}</strong></div>
      </v-col>
    </v-row>
    <div class="scrollable-content">
        <!-- C Levels Group -->
        <v-row>
        <v-col cols="1" class="text-center static-col extra-info-group">
          <div class="mb-1">Sub Occ</div>
        </v-col>
        <v-col cols="11">
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
        <v-col cols="1" class="text-center static-col extra-info-group">
          <div class="mb-1">Upper Cerv</div>
        </v-col>
        <v-col cols="11">
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
        <v-col cols="1" class="text-center static-col extra-info-group">
          <div class="mb-1">Mid Cerv</div>
        </v-col>
        <v-col cols="11">
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
        <v-col cols="1" class="text-center static-col extra-info-group">
          <div class="mb-1">Lower Cerv</div>
        </v-col>
        <v-col cols="11">
          <v-row v-for="(row, i) in rows.slice(5, 7)" :key="i">
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
        <v-col cols="1" class="text-center static-col extra-info-group">
          <div class="mb-1">Upper T</div>
        </v-col>
        <v-col cols="11">
          <v-row v-for="(row, i) in rows.slice(7, 10)" :key="i">
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
        <v-col cols="1" class="text-center static-col extra-info-group">
          <div class="mb-1">Mid T</div>
        </v-col>
        <v-col cols="11">
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
        <v-col cols="1" class="text-center static-col extra-info-group">
          <div class="mb-1">Lower T</div>
        </v-col>
        <v-col cols="11">
          <v-row v-for="(row, i) in rows.slice(14, 19)" :key="i">
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
        <v-col cols="1" class="text-center static-col extra-info-group">
          <div class="mb-1">Upper L</div>
        </v-col>
        <v-col cols="11">
          <v-row v-for="(row, i) in rows.slice(19, 22)" :key="i">
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
        <v-col cols="1" class="text-center static-col extra-info-group">
          <div class="mb-1">Lower L</div>
        </v-col>
        <v-col cols="11">
          <v-row v-for="(row, i) in rows.slice(22, 24)" :key="i">
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
        <v-col cols="1" class="text-center static-col extra-info-group">
          <div class="mb-1">Upper S</div>
        </v-col>
        <v-col cols="11">
          <v-row v-for="(row, i) in rows.slice(24, 27)" :key="i">
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
        <v-col cols="1" class="text-center static-col extra-info-group">
          <div class="mb-1">Lower S</div>
        </v-col>
        <v-col cols="11">
          <v-row v-for="(row, i) in rows.slice(27, 29)" :key="i">
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
        's5_s6',
        ],
        cols: ['Sides', 'Subluxation', 'Muscle Spasm', 'Trigger Points', 'Tenderness', 'Numbness', 'Edema', 'Swelling', 'Reduced Motion'],
        mapColsToFields: {
          'Sides': 'side',
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

        return this.getDisplayedValue(value);
      },
      getDisplayedValue(value) {
        switch (value) {
          case 'l':
            return 'Left';
          case 'r':
            return 'Right';
          case 'b':
            return 'Both';
          default:
            return value;
        }
      },
    }
  }
  </script>

<style scoped>
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
</style>