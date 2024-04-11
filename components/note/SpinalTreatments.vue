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
      treatment set is {{ treatmentSet }} treatment set 1 is
      {{ treatmentSet[0] }}
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
            @click="toggleField(treatment, methodName)"
          >
            <SvgRender
              v-if="treatment[methodName] && !editMode"
              :width="20"
              :height="20"
              icon="x"
            />
            <SvgRender
              v-if="treatment[methodName] && editMode"
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

export default {
  name: 'SpinalTreatments',
  components: { SvgRender },
  data() {
    return {
      editMode: false,
      treatmentService: null,
      existingTreatments: [],
      treatmentsCopy: null,
      initialTreatments: null,
      treatments: [],
      existingTreatmentsToDelete: new Set(),
      methodNames: [],
      methodNameService: null,
      spinalTreatments: [],
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
    this.methodNames = await this.methodNameService.getTreatmentMethodNames();
    console.log('method names ', this.methodNames);
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

    this.spinalTreatments = spinalLevels.map((level) => ({
      spinalLevel: level,
      side: null,
      treatments: {
        ...this.methodNames.reduce(
          (acc, methodName) => ({
            ...acc,
            [methodName]: false,
          }),
          {}
        ),
      },
    }));

    this.treatments = this.spinalTreatments;

    await this.getExistingTreatments();
  },
  methods: {
    startEditMode() {
      this.editMode = true;
      this.treatmentsCopy = this.treatments;
    },
    toggleField(treatment, field) {
      if (this.editMode) {
        console.log('treatment is ', treatment);
        treatment[field] = !treatment[field];
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

    async getExistingTreatments() {
      this.existingTreatments =
        await this.treatmentService.getTreatmentsForNote({
          id: this.$route.params.noteId,
        });
      if (this.existingTreatments.length > 0) {
        this.treatments = this.treatments.map((treatment) => {
          const existing = this.existingTreatments.find(
            (el) => el.spinalLevel === treatment.spinalLevel
          );
          return existing ? { ...treatment, ...existing } : treatment;
        });
      }
      this.initialTreatments = JSON.parse(JSON.stringify(this.treatments));
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
