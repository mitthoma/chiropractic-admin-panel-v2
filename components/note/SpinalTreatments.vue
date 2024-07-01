<template>
  <div>
    <v-card>
      <div class="card-header">
        <v-card-title>Treatments - Spinal</v-card-title>
        <div class="icon-container">
          <v-icon v-if="!editMode" @click="startEditMode">mdi-pencil</v-icon>
          <div v-if="editMode">
            <v-icon @click="handleCancel">mdi-trash-can</v-icon>
            <v-icon @click="handleSave">mdi-check</v-icon>
          </div>
        </div>
      </div>
      <v-progress-circular
        v-if="isLoading"
        indeterminate
        color="primary"
      ></v-progress-circular>
      <table v-else class="p-3 treatment-table">
        <tr class="table-heading-row">
          <th>
            <div class="outer"><p class="inner">Level</p></div>
          </th>
          <th>
            <div class="outer"><p class="inner">Side</p></div>
          </th>
          <th v-for="methodName in methodNames" :key="methodName">
            <div>
              <p>{{ methodName.name }}</p>
            </div>
          </th>
          <th>
            <div class="outer"><p class="inner">Physio Position</p></div>
          </th>
          <th>
            <div class="outer"><p class="inner">Treatment Position</p></div>
          </th>
          <th>
            <div class="outer"><p class="inner">Treatment Technique</p></div>
          </th>
          <th v-if="editMode">Actions</th>
        </tr>

        <tr
          v-for="(treatment, index) in treatmentSet"
          :key="index"
          class="treatment-row"
        >
          <td>{{ transformLabel(treatment.spinalLevel) }}</td>
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
              :width="15"
              :height="15"
              icon="x"
            />
            <SvgRender
              v-if="treatment[methodName.name]?.active && editMode"
              :width="15"
              :height="15"
              class="editable-field"
              icon="x"
            />
          </td>
          <td v-if="!editMode">
            {{ treatment.physioPositioning }}
          </td>
          <td v-else class="editable-field">
            <v-select
              v-model="treatment.physioPositioning"
              :items="physioPositioningOptions"
              item-text="title"
              item-value="value"
              v-bind="{ 'return-object': false }"
            ></v-select>
          </td>
          <td v-if="!editMode">
            {{ treatment.treatmentPositioning }}
          </td>
          <td v-else class="editable-field">
            <v-select
              v-model="treatment.treatmentPositioning"
              :items="treatmentPositioningOptions"
              item-text="title"
              item-value="value"
              v-bind="{ 'return-object': false }"
            ></v-select>
          </td>
          <td v-if="!editMode">
            {{ treatment.treatmentTechnique }}
          </td>
          <td v-else class="editable-field">
            <v-select
              v-model="treatment.treatmentTechnique"
              :items="treatmentTechniqueOptions"
              item-text="title"
              item-value="value"
              v-bind="{ 'return-object': false }"
            ></v-select>
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
import { createTreatmentOptionService } from '~~/services/treatmentOption';

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
      physioPositioningOptions: [],
      treatmentPositioningOptions: [],
      treatmentTechniqueOptions: [],
      options: [],
      deleted: [],
      isLoading: false,
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
    this.treatmentOptionService = createTreatmentOptionService(this.$api);
    this.options = await this.treatmentOptionService.getTreatmentOptions();
    this.physioPositioningOptions = this.options
      .filter((option) => option.category === 'physioPositioning')
      .map((option) => option.text);

    this.treatmentPositioningOptions = this.options
      .filter((option) => option.category === 'treatmentPositioning')
      .map((option) => option.text);

    this.treatmentTechniqueOptions = this.options
      .filter((option) => option.category === 'treatmentTechnique')
      .map((option) => option.text);

    await this.getExistingTreatmentsForNote();
  },
  methods: {
    async getExistingTreatmentsForNote() {
      this.isLoading = true;
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
          physioPositioning: null,
          treatmentPositioning: null,
          treatmentTechnique: null,
          treatmentManipulation: null,
        });
      });

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

      // Filter out deleted treatments
      this.existingTreatments = this.existingTreatments.filter(
        (treatment) => !this.deleted.includes(treatment.id)
      );

      this.existingTreatments.forEach((existingTreatment) => {
        this.spinalTreatments.forEach(async (spinalTreatment) => {
          if (existingTreatment.spinalLevel === spinalTreatment.spinalLevel) {
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
      this.deleted = [];
      this.isLoading = false;
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
      if (this.editMode) {
        this.treatmentsCopy.forEach((trCopy) => {
          if (trCopy.spinalLevel === treatment.spinalLevel) {
            trCopy[field].active = !trCopy[field].active;
          }
        });
      }
    },

    handleRowClear(level) {
      this.treatmentsCopy.forEach((tr) => {
        if (tr.spinalLevel === level) {
          tr.side = null;
          tr.physioPositioning = null;
          tr.treatmentPositioning = null;
          tr.treatmentTechnique = null;
          this.methodNames.forEach((mn) => {
            tr[mn.name] = false;
          });
        }
      });
    },

    transformLabel(label) {
      return label
        .split('_')
        .map((part) => part.toUpperCase())
        .join(' - ');
    },

    async handleSave() {
      this.isLoading = true;
      for (const tr of this.treatmentsCopy) {
        if (tr.side) {
          if (tr.id) {
            const updatedTreatment = {
              id: tr.id,
              side: tr.side,
              spinalLevel: tr.spinalLevel,
              physioPositioning: tr.physioPositioning,
              treatmentPositioning: tr.treatmentPositioning,
              treatmentTechnique: tr.treatmentTechnique,
              treatmentManipulation: tr.treatmentManipulation,
              noteId: this.$route.params.noteId,
            };

            await this.treatmentService.updateTreatment(updatedTreatment);

            const existingMethodsForTreatment =
              await this.methodService.getTreatmentMethodsForTreatment({
                treatmentId: tr.id,
              });

            for (const mn of this.methodNames) {
              const currentMethodState = tr[mn.name]?.active;
              const existingMethod = existingMethodsForTreatment.find(
                (method) => method.treatmentMethodNameId === mn.id
              );

              if (currentMethodState && !existingMethod) {
                await this.methodService.addTreatmentMethod({
                  treatmentMethodNameId: mn.id,
                  treatmentId: tr.id,
                  active: true,
                });
              } else if (!currentMethodState && existingMethod) {
                await this.methodService.deleteTreatmentMethod({
                  id: existingMethod.id,
                });
              }
            }
          } else {
            const newTreatmentData = {
              spinalLevel: tr.spinalLevel,
              side: tr.side,
              note: this.$route.params.noteId,
              category: 'spinal',
              physioPositioning: tr.physioPositioning,
              treatmentPositioning: tr.treatmentPositioning,
              treatmentTechnique: tr.treatmentTechnique,
            };

            const newTreatment =
              await this.treatmentService.addTreatment(newTreatmentData);

            for (const methodName of this.methodNames) {
              if (tr[methodName.name].active) {
                await this.methodService.addTreatmentMethod({
                  treatmentId: newTreatment.id,
                  treatmentMethodNameId: methodName.id,
                  active: true,
                });
              }
            }
          }
        } else if (tr.spinalLevel) {
          const trBackup = this.treatmentsBackup.find(
            (tb) => tb.spinalLevel === tr.spinalLevel && tb.side
          );

          if (trBackup) {
            const existingMethodsForTreatment =
              await this.methodService.getTreatmentMethodsForTreatment({
                treatmentId: trBackup.id,
              });

            for (const methodToDelete of existingMethodsForTreatment) {
              await this.methodService.deleteTreatmentMethod({
                id: methodToDelete.id,
              });
            }

            this.deleted.push(trBackup.id);

            await this.treatmentService.deleteTreatment({
              id: trBackup.id,
            });
          }
        }
      }

      this.isLoading = false;
      this.editMode = false;
      this.existingTreatments = [];
      this.treatmentsBackup = [];
      this.treatmentsCopy = [];
      this.treatments = [];
      this.spinalTreatments = [];
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

<style scoped>
.treatment-table {
  border-radius: 5px;
  width: 100%;
  text-align: center;
  padding-left: 10%;
  padding-right: 10%;
  padding-top: 2%;
  padding-bottom: 2%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.icon-container {
  display: flex;
  gap: 5px;
}
.table {
  border-collapse: collapse;
  width: 100%;
  text-align: center;
}
th,
td {
  border: 1px solid #ddd;
  text-align: center;
}
th {
  background-color: #f2f2f2;
  font-weight: bold;
  max-width: 5vw;
  word-wrap: normal;
  font-size: 12px;
  padding: 8px;
}
td {
  padding: 4px;
}
.outer {
  background-color: #f2f2f2;
  font-weight: bold;
  max-width: 5vw;
  word-wrap: normal;
  padding-top: 4vh;
  padding-bottom: 4vh;
}
.inner {
  transform: rotate(90deg);
}
.editable-field {
  cursor: pointer;
}

.icon-container {
  display: flex;
  align-items: center;
  padding: 10px;
}
</style>
