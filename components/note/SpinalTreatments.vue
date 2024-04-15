<template>
  <div>
    <v-card>
      <div class="card-header">
        <v-card-title>Spinal Treatments</v-card-title>
        <div class="icon-container">
          <v-icon v-if="!editMode" @click="startEditMode">mdi-pencil</v-icon>
          <div v-if="editMode">
            <v-icon @click="handleCancel">mdi-trash-can</v-icon>
            <v-icon @click="handleSave">mdi-check</v-icon>
          </div>
        </div>
      </div>

      <table class="p-3 treatment-table">
        <tr class="table-heading-row">
          <th>Level</th>
          <th>Side</th>
          <th v-for="methodName in methodNames" :key="methodName">
            {{ methodName.name }}
          </th>
          <th v-if="editMode">Actions</th>
        </tr>

        <tr
          v-for="(treatment, index) in treatmentSet"
          :key="index"
          class="treatment-row"
        >
          <td>{{ treatment.spinalLevel }}</td>
          <td v-if="!editMode">
            {{
              treatment.side === 'l'
                ? 'Left'
                : treatment.side === 'r'
                  ? 'Right'
                  : treatment.side === 'b'
                    ? 'Both'
                    : ''
            }}
          </td>
          <td v-else>
            <v-select
              v-model="treatment.side"
              :items="sideOptions"
              item-text="title"
              item-value="value"
              label="Select Side"
              v-bind="{ 'return-object': false }"
            ></v-select>
          </td>
          <td
            v-for="methodName in methodNames"
            :key="methodName"
            @click="toggleField(treatment, methodName.name)"
          >
            <SvgRender
              v-if="treatment[methodName.name]?.active && !editMode"
              :width="20"
              :height="20"
              icon="x"
            />
            <SvgRender
              v-if="treatment[methodName.name]?.active && editMode"
              :width="20"
              :height="20"
              class="editable-field"
              icon="x"
            />
          </td>
          <td v-if="editMode">
            <v-btn
              text
              color="red"
              @click="handleRowClear(treatment.spinalLevel)"
            >
              Clear
            </v-btn>
          </td>
        </tr>
      </table>
    </v-card>
  </div>
</template>

<script>
import SvgRender from '../SvgRender.vue';
import { sides } from '../helper';
import { createTreatmentService } from '~~/services/treatment';
import { createTreatmentMethodNameService } from '~~/services/treatmentMethodName';
import { createTreatmentMethodService } from '~~/services/treatmentMethod';

export default {
  name: 'SpinalTreatments',
  components: { SvgRender },
  data() {
    return {
      editMode: false,
      treatmentService: null,
      existingTreatments: [],
      treatmentsCopy: [],
      treatments: [],
      methodNames: [],
      methodNameService: null,
      methodService: null,
      spinalTreatments: [],
      treatmentsBackup: [],
    };
  },
  computed: {
    treatmentSet() {
      return this.editMode ? this.treatmentsCopy : this.treatments;
    },
    sideOptions() {
      return sides;
    },
  },
  async mounted() {
    this.treatmentService = createTreatmentService(this.$api);
    this.methodNameService = createTreatmentMethodNameService(this.$api);
    this.methodService = createTreatmentMethodService(this.$api);
    this.methodNames = await this.methodNameService.getTreatmentMethodNames();
    this.methodNames = Array.isArray(this.methodNames) ? this.methodNames : [];

    await this.getExistingTreatmentsForNote();
  },
  methods: {
    async getExistingTreatmentsForNote() {
      const spinalLevels = [
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
        's5_',
      ];

      spinalLevels.forEach((lvl) => {
        this.spinalTreatments.push({
          spinalLevel: lvl,
          side: null,
          category: 'spinal',
        });
      });

      // initial load in of the methodName fields for each treatment
      this.spinalTreatments.forEach((st) => {
        this.methodNames.forEach((methodName) => {
          st[methodName.name] = {
            id: methodName.id,
            name: methodName.name,
            active: false,
          };
        });
      });
      this.existingTreatments =
        await this.treatmentService.getTreatmentsForNote({
          id: this.$route.params.noteId,
        });

      // go through each existing treatment and see if we can match it to the spinalTreatments array by spinalLevel
      this.existingTreatments.forEach((existingTreatment) => {
        this.spinalTreatments.forEach(async (spinalTreatment) => {
          if (existingTreatment.spinalLevel === spinalTreatment.spinalLevel) {
            // we found an existing treatment!
            // now we must find the dynamic values as they exist for this treatment and populate the spinalTreatments array
            const treatmentId = existingTreatment.id;
            spinalTreatment.id = treatmentId;
            spinalTreatment.side = existingTreatment.side;
            spinalTreatment.physioPositioning =
              existingTreatment.physioPositioning;
            spinalTreatment.treatmentPositioning =
              existingTreatment.treatmentPositioning;
            spinalTreatment.treatmentTechnique =
              existingTreatment.treatmentTechnique;
            spinalTreatment.treatmentManipulation =
              existingTreatment.treatmentManipulation;
            const treatmentMethodsForTreatment =
              await this.methodService.getTreatmentMethodsForTreatment({
                treatmentId,
              });

            treatmentMethodsForTreatment.forEach(
              (treatmentMethodForTreatment) => {
                let currMethod;

                this.methodNames.forEach((mn) => {
                  if (
                    mn.id === treatmentMethodForTreatment.treatmentMethodNameId
                  ) {
                    currMethod = mn;
                  }
                });

                spinalTreatment[currMethod.name].active =
                  treatmentMethodForTreatment.active;
              }
            );
          }
        });
      });

      this.treatments = this.spinalTreatments;
    },
    startEditMode() {
      this.editMode = true;
      this.treatmentsBackup = this.treatments.map((treatment) =>
        JSON.parse(JSON.stringify(treatment))
      );
      this.treatmentsCopy = this.treatments.map((treatment) =>
        JSON.parse(JSON.stringify(treatment))
      );
      this.treatments = [];
    },
    // toggleSide(treatment, side) {
    //   console.log('treatment is ', treatment);
    //   if (this.editMode) {
    //     this.treatmentsCopy.forEach((trCopy) => {
    //       if (trCopy.spinalLevel === treatment.spinalLevel) {
    //         trCopy.side = side;
    //       }
    //     });
    //   }
    // },
    toggleField(treatment, field) {
      if (this.editMode) {
        this.treatmentsCopy.forEach((trCopy) => {
          if (trCopy.spinalLevel === treatment.spinalLevel) {
            trCopy[field].active = !trCopy[field].active;
          }
        });
      }
    },

    // todo: handle row clear for treatments
    handleRowClear(level) {
      console.log(level);
      // big thing here is we need to clear the side of the cleared ones, this is what will determine deletion in handleSave
    },

    deleteTreatments() {
      // todo: implement delete Treatments
    },

    // TODO: HandleSave/update
    async handleSave() {
      console.log('copy is ', this.treatmentsCopy); // updated one
      console.log('reg is ', this.treatments); // cleared one
      console.log('backup is ', this.treatmentsBackup); // old one

      // TODO: SIDE IS NOT BEING RECORDED OR SHOWN

      console.log('TREATMENTS COPY IS ', this.treatmentsCopy);

      // for (const tr in this.treatmentsCopy) {
      this.treatmentsCopy.forEach(async (tr) => {
        if (tr.side) {
          // this means it has an input, decide whether it is new or updatedjk
          if (tr.id) {
            // update
          } else {
            // save
            const methodToAdd = {};
            const newTreatmentToAdd = {};

            const methodNameOnly = [];
            this.methodNames.forEach((mn) => {
              methodNameOnly.push(mn.name);
            });

            // Iterate over all properties in the object
            for (const key in tr) {
              if (Object.prototype.hasOwnProperty.call(tr, key)) {
                // If the key is in the fieldsToStrip array, add to tempObject
                if (methodNameOnly.includes(key)) {
                  methodToAdd[key] = tr[key];
                } else {
                  // Otherwise, add to remainingObject
                  newTreatmentToAdd[key] = tr[key];
                }
              }
            }

            console.log('new treatment to add is ', newTreatmentToAdd);

            // now we save the newTreatmentToAdd as a treatment.
            const newlyAddedTreatment =
              await this.treatmentService.addTreatment({
                ...newTreatmentToAdd,
                note: this.$route.params.noteId,
              });

            // then go through the fields in the methodToAdd object. Each field will be a new method

            for (const key in methodToAdd) {
              this.methodNames.forEach(async (mn) => {
                if (mn.name === key) {
                  console.log('MN IS ', mn);
                  console.log('new tr IS ', newlyAddedTreatment);

                  await this.methodService.addTreatmentMethod({
                    treatmentMethodNameId: mn?.id,
                    treatmentId: newlyAddedTreatment?.id,
                    active: true,
                  });
                }
              });
            }
          }
        } else {
          console.log('no side');
          // if it does not have a side, then we must check if it exists in backup

          this.treatmentsBackup.forEach(async (trBackup) => {
            if (trBackup.spinalLevel === tr.spinalLevel && trBackup.side) {
              // on the backend, this will delete any associated treatmentmethods first
              await this.treatmentService.deleteTreatment({ id: trBackup.id });
            }
          });
        }
      });

      // }

      // restore the backup with a new one
      this.editMode = false;
      this.existingTreatments = [];
      this.treatmentsBackup = [];
      this.treatmentsCopy = [];
      this.treatments = [];
      await this.getExistingTreatmentsForNote();
    },

    handleCancel() {
      this.editMode = false;
      this.treatments = this.treatmentsBackup.map((t) => ({ ...t }));
      this.treatmentsBackup = [];
      this.treatmentsCopy = [];
    },
    backToPatient() {
      this.$router.push(`/patient/${this.$route.params.id}`);
    },
  },
};
</script>

<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->
<!-- styling -->

<style scoped>
.treatment-table {
  border-radius: 5px;
  width: 100%;
  table-layout: fixed;
  padding: 10px;
  text-align: center;
}

.treatment-table th,
.treatment-table td {
  padding: 16px 4px;
}

.treatment-table td {
  border: 1px solid black;
}

.treatment-table th {
  font-size: 12px;
  transform: rotate(90deg);
  text-wrap: wrap;
}

.table-heading-row {
  height: 10vh;
  padding-top: 15px;
  padding-bottom: 15px;
  margin-bottom: 100px !important;
}

.treatment-table input[type='text'] {
  width: 100%;
  box-sizing: border-box;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.icon-container {
  display: flex;
  align-items: center;
  padding: 10px;
}

.editable-field {
  cursor: pointer;
}

.clear-row-button {
  margin-left: auto;
  border: 1px solid red;
}

.treatment-table th {
  border-right: 30px solid transparent;
}
</style>
