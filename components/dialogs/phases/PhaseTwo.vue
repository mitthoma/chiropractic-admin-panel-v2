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
v-model="grid[i][j]" hide-details dense class="input-field" :placeholder="placeholders[j]"
                  @input="updateValue(i, j, $event)" />
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
            }
        },
        data() {
          return {
            dialog: true,
            valid: true,
            rows: ['RowLabel1', 'RowLabel2', 'RowLabel3', 'RowLabel4', 'RowLabel5', 'RowLabel6', 'RowLabel7', 'RowLabel8', 'RowLabel9', 'RowLabel10', 'RowLabel11', 'RowLabel12', 'RowLabel13', 'RowLabel14', 'RowLabel15'],
            cols: ['ColLabel1', 'ColLabel2', 'ColLabel3', 'ColLabel4', 'ColLabel5', 'ColLabel6', 'ColLabel7', 'ColLabel8', 'ColLabel9', 'ColLabel10', 'ColLabel11', 'ColLabel12'],
            grid: Array(15).fill(Array(12).fill(null)),
            placeholders: ['Placeholder1', 'Placeholder2', 'Placeholder3', 'Placeholder4', 'Placeholder5', 'Placeholder6', 'Placeholder7', 'Placeholder8', 'Placeholder9', 'Placeholder10', 'Placeholder11', 'Placeholder12']
          };
        },
        methods: {
          updateValue(i, j, value) {
            this.$set(this.grid, i, [...this.grid[i].slice(0, j), value, ...this.grid[i].slice(j + 1)]);
          },
          submit() {
            if (this.$refs.form.validate()) {
              // submit form
            }
          }
        }
    }
  </script>

  <style scoped>
  .v-text-field {
  max-width: 50px;
  margin: 0;
}

.rotate {
  transform: rotate(90deg);
  margin-bottom: 10px;
}

.grid-container {
  max-height: 70vh;
  padding: 20px;
}

.dialog-card {
  max-width: 90vw;
}

.v-col {
  padding: 0;
}

.header-row {
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: white;
}

.static-col {
  position: sticky;
  left: 0;
  z-index: 1;
  background-color: white;
}

.scrollable-content {
  overflow: auto;
  max-height: 70vh;
}
  </style>