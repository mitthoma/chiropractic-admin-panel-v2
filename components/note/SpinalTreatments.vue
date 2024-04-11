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
                    : 'None'
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
      initialTreatments: null,
      treatments: [],
      existingTreatmentsToDelete: new Set(),
      methodNames: [],
      methodNameService: null,
      methodService: null,
      spinalTreatments: [],
      treatmentsBackup: [],
    };
  },
  computed: {
    treatmentSet() {
      console.log('TREATMENT SET CALLED');
      console.log('treatment backup is ', this.treatmentsBackup);
      console.log('treatment copy is ', this.treatmentsCopy);
      console.log('treatmentis ', this.treatments[0]);

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
    console.log('METHOD NAMES BROUGHT IN ARE ', this.methodNames);

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

    console.log(
      'spinal treatments after initial load are ',
      this.spinalTreatments
    );

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

    console.log(
      'spinal treatments after initial field load-in are ',
      this.spinalTreatments
    );

    await this.getExistingTreatmentsForNote();
    this.treatments = this.spinalTreatments;
    console.log('this treatments is ', this.treatments);
  },
  methods: {
    async getExistingTreatmentsForNote() {
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
    toggleField(treatment, field) {
      // toggling only affects treatmentsCopy. If I don't save, treatments does not get affected
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
      this.treatmentsCopy.forEach((treatment) => {
        if (treatment.spinalLevel === level) {
          this.existingTreatmentsToDelete.add(treatment.id);
          treatment.side = null;
          treatment.sublux = false;
          treatment.muscleSpasm = false;
          treatment.tenderness = false;
          treatment.numbness = false;
          treatment.edema = false;
          treatment.triggerPoints = false;
          treatment.swelling = false;
          treatment.reducedMotion = false;
        }
      });
    },

    deleteTreatments() {
      this.existingTreatmentsToDelete.forEach(async (treatmentId) => {
        await this.treatmentService.deleteTreatment({ id: treatmentId });
        this.existingTreatments = this.existingTreatments.filter(
          (treatment) => treatment.id !== treatmentId
        );

        this.treatments.forEach((originalTreatment) => {
          if (originalTreatment.id === treatmentId) {
            originalTreatment.side = null;
            originalTreatment.sublux = false;
            originalTreatment.muscleSpasm = false;
            originalTreatment.tenderness = false;
            originalTreatment.numbness = false;
            originalTreatment.edema = false;
            originalTreatment.triggerPoints = false;
            originalTreatment.swelling = false;
            originalTreatment.reducedMotion = false;
          }
        });
      });
      this.resetComponent();
    },

    backToPatient() {
      this.$router.push(`/patient/${this.$route.params.id}`);
    },
    async handleSave() {
      for (const treatment of this.treatments) {
        if (treatment.side) {
          const matchingTreatment = this.existingTreatments.find(
            (el) => el.spinalLevel === treatment.spinalLevel
          );

          const isChanged =
            JSON.stringify(treatment) !==
            JSON.stringify(
              this.initialTreatments.find(
                (r) => r.spinalLevel === treatment.spinalLevel
              )
            );

          if (isChanged) {
            if (matchingTreatment) {
              await this.treatmentService.updateTreatment({
                id: matchingTreatment.id,
                ...treatment,
              });

              // now catch existingTreatments up
              this.existingTreatments = this.existingTreatments.filter(
                (treatment) => treatment.id !== matchingTreatment.id
              );

              const newTreatment = {
                id: matchingTreatment.id,
                ...treatment,
              };

              this.existingTreatments.push(newTreatment);
              this.treatments = this.spinalTreatments;

              if (this.existingTreatments.length > 0) {
                this.treatments = this.treatments.map((treatment) => {
                  const existing = this.existingTreatments.find(
                    (el) => el.spinalLevel === treatment.spinalLevel
                  );
                  return existing ? { ...treatment, ...existing } : treatment;
                });
              }
              this.initialTreatments = JSON.parse(
                JSON.stringify(this.treatments)
              );
            } else {
              const newTreatment = await this.treatmentService.addTreatment({
                ...treatment,
                note: this.$route.params.noteId,
                category: 'spinal',
              });

              // now catch existingTreatments up
              this.existingTreatments.push(newTreatment);
              this.treatments = this.spinalTreatments;
              if (this.existingTreatments.length > 0) {
                this.treatments = this.treatments.map((treatment) => {
                  const existing = this.existingTreatments.find(
                    (el) => el.spinalLevel === treatment.spinalLevel
                  );
                  return existing ? { ...treatment, ...existing } : treatment;
                });
              }
              this.initialTreatments = JSON.parse(
                JSON.stringify(this.treatments)
              );
            }
          }
        } else {
          // this.treatments
        }
      }

      console.log(
        'existingTreatments at end of day are ',
        this.existingTreatments
      );
      this.deleteTreatments();
    },
    resetComponent() {
      this.existingTreatmentsToDelete.clear();

      this.editMode = false;
      this.treatmentsCopy = this.treatments;
    },
    handleCancel() {
      this.editMode = false;
      this.existingTreatmentsToDelete.clear();

      console.log('TREATMENTS BACKUP ', this.treatmentsBackup[0]);

      // Clear treatments array completely before restoring from backup
      // Reset treatments to its original state before any edits were made
      this.treatments = this.treatmentsBackup.map((t) => ({ ...t }));
      this.treatmentsBackup = []; // Clear the backup after restoring
      this.treatmentsCopy = []; // Also clear the working copy
    },
  },
};
</script>

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
