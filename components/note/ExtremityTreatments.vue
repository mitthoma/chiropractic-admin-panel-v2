<template>
  <div>
    <v-card>
      <div class="card-header">
        <v-card-title>Extremity Treatments</v-card-title>
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
          <th>Physio Position</th>
          <th>Treatment Position</th>
          <th>Treatment Technique</th>
          <th v-if="editMode">Actions</th>
        </tr>

        <tr
          v-for="(treatment, index) in treatmentSet"
          :key="index"
          class="treatment-row"
        >
          <td>{{ treatment.extremityLevel }}</td>
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
              @click="handleRowClear(treatment.extremityLevel)"
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
  name: 'ExtremityTreatments',
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
      extremityTreatments: [],
      treatmentsBackup: [],
      physioPositioningOptions: [],
      treatmentPositioningOptions: [],
      treatmentTechniqueOptions: [],
      options: [],
      deleted: [],
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
      const extremityLevels = [
        'arm',
        'bicep',
        'tricep',
        'elbow',
        'wrist',
        'hand',
        'hip',
        'thigh',
        'leg',
        'knee',
        'calf',
        'ankle',
        'foot',
      ];

      extremityLevels.forEach((lvl) => {
        this.extremityTreatments.push({
          extremityLevel: lvl,
          side: null,
          category: 'extremity',
          physioPositioning: null,
          treatmentPositioning: null,
          treatmentTechnique: null,
          treatmentManipulation: null,
        });
      });

      this.extremityTreatments.forEach((st) => {
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
        this.extremityTreatments.forEach(async (extremityTreatment) => {
          if (
            existingTreatment.extremityLevel ===
            extremityTreatment.extremityLevel
          ) {
            const treatmentId = existingTreatment.id;
            extremityTreatment.id = treatmentId;
            extremityTreatment.side = existingTreatment.side;
            extremityTreatment.physioPositioning =
              existingTreatment.physioPositioning;
            extremityTreatment.treatmentPositioning =
              existingTreatment.treatmentPositioning;
            extremityTreatment.treatmentTechnique =
              existingTreatment.treatmentTechnique;
            extremityTreatment.treatmentManipulation =
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
                extremityTreatment[currMethod.name].active =
                  treatmentMethodForTreatment.active;
              }
            );
          }
        });
      });

      this.treatments = this.extremityTreatments;
      this.deleted = [];
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
          if (trCopy.extremityLevel === treatment.extremityLevel) {
            trCopy[field].active = !trCopy[field].active;
          }
        });
      }
    },

    handleRowClear(level) {
      this.treatmentsCopy.forEach((tr) => {
        if (tr.extremityLevel === level) {
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

    async handleSave() {
      for (const tr of this.treatmentsCopy) {
        if (tr.side) {
          if (tr.id) {
            const updatedTreatment = {
              id: tr.id,
              side: tr.side,
              extremityLevel: tr.extremityLevel,
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
              extremityLevel: tr.extremityLevel,
              side: tr.side,
              note: this.$route.params.noteId,
              category: 'extremity',
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
        } else if (tr.extremityLevel) {
          const trBackup = this.treatmentsBackup.find(
            (tb) => tb.extremityLevel === tr.extremityLevel && tb.side
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

      this.editMode = false;
      this.existingTreatments = [];
      this.treatmentsBackup = [];
      this.treatmentsCopy = [];
      this.treatments = [];
      this.extremityTreatments = [];
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
