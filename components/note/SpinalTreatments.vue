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
          <th>Sublux</th>
          <th>Muscle Spasm</th>
          <th>Trigger Points</th>
          <th>Tenderness</th>
          <th>Numbness</th>
          <th>Edema</th>
          <th>Swelling</th>
          <th>Reduced Motion</th>
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
          <td v-if="!editMode">
            <SvgRender
              v-if="treatment.sublux"
              :width="20"
              :height="20"
              icon="x"
            />
          </td>
          <td
            v-else
            class="editable-field"
            @click="toggleField(treatment, 'sublux')"
          >
            <SvgRender
              v-if="treatment.sublux"
              :width="20"
              :height="20"
              icon="x"
            />
          </td>
          <td v-if="!editMode">
            <SvgRender
              v-if="treatment.muscleSpasm"
              :width="20"
              :height="20"
              icon="x"
            />
          </td>
          <td
            v-else
            class="editable-field"
            @click="toggleField(treatment, 'muscleSpasm')"
          >
            <SvgRender
              v-if="treatment.muscleSpasm"
              :width="20"
              :height="20"
              icon="x"
            />
          </td>
          <td v-if="!editMode">
            <SvgRender
              v-if="treatment.triggerPoints"
              :width="20"
              :height="20"
              icon="x"
            />
          </td>
          <td
            v-else
            class="editable-field"
            @click="toggleField(treatment, 'triggerPoints')"
          >
            <SvgRender
              v-if="treatment.triggerPoints"
              :width="20"
              :height="20"
              icon="x"
            />
          </td>
          <td v-if="!editMode">
            <SvgRender
              v-if="treatment.tenderness"
              :width="20"
              :height="20"
              icon="x"
            />
          </td>
          <td
            v-else
            class="editable-field"
            @click="toggleField(treatment, 'tenderness')"
          >
            <SvgRender
              v-if="treatment.tenderness"
              :width="20"
              :height="20"
              icon="x"
            />
          </td>
          <td v-if="!editMode">
            <SvgRender
              v-if="treatment.numbness"
              :width="20"
              :height="20"
              icon="x"
            />
          </td>
          <td
            v-else
            class="editable-field"
            @click="toggleField(treatment, 'numbness')"
          >
            <SvgRender
              v-if="treatment.numbness"
              :width="20"
              :height="20"
              icon="x"
            />
          </td>
          <td v-if="!editMode">
            <SvgRender
              v-if="treatment.edema"
              :width="20"
              :height="20"
              icon="x"
            />
          </td>
          <td
            v-else
            class="editable-field"
            @click="toggleField(treatment, 'edema')"
          >
            <SvgRender
              v-if="treatment.edema"
              :width="20"
              :height="20"
              icon="x"
            />
          </td>
          <td v-if="!editMode">
            <SvgRender
              v-if="treatment.swelling"
              :width="20"
              :height="20"
              icon="x"
            />
          </td>
          <td
            v-else
            class="editable-field"
            @click="toggleField(treatment, 'swelling')"
          >
            <SvgRender
              v-if="treatment.swelling"
              :width="20"
              :height="20"
              icon="x"
            />
          </td>
          <td v-if="!editMode">
            <SvgRender
              v-if="treatment.reducedMotion"
              :width="20"
              :height="20"
              icon="x"
            />
          </td>
          <td
            v-else
            class="editable-field"
            @click="toggleField(treatment, 'reducedMotion')"
          >
            <SvgRender
              v-if="treatment.reducedMotion"
              :width="20"
              :height="20"
              icon="x"
            />
          </td>
          <td
            v-if="
              editMode &&
              existingShownEntries.some(
                (e) => e.spinalLevel === treatment.spinalLevel
              )
            "
          >
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
import { spinalEntries } from './helpers/constants';
import { createTreatmentService } from '~~/services/treatment';

export default {
  name: 'SpinalTreatments',
  components: { SvgRender },
  data() {
    return {
      editMode: false,
      treatmentService: null,
      existingTreatments: [],
      treatmentsCopy: null,
      initialEntries: null,
      treatments: [],
      existingEntriesToDelete: new Set(),
    };
  },
  computed: {
    entrySet() {
      return this.editMode ? this.entriesCopy : this.treatments;
    },
    sideOptions() {
      return sides;
    },
    existingShownEntries() {
      return this.existingEntries;
    },
  },
  async mounted() {
    this.treatments = spinalEntries;
    this.treatmentService = await createTreatmentService(this.$api);
    await this.getExistingTreatments();
  },
  methods: {
    startEditMode() {
      this.editMode = true;
      this.entriesCopy = this.treatments;
    },
    toggleField(treatment, field) {
      treatment[field] = !treatment[field];
    },

    // todo: handle row clear for treatments
    handleRowClear(level) {
      this.entriesCopy.forEach((treatment) => {
        if (treatment.spinalLevel === level) {
          this.existingEntriesToDelete.add(treatment.id);
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

    deleteEntries() {
      this.existingEntriesToDelete.forEach(async (entryId) => {
        await this.entryService.deleteEntry({ id: entryId });
        this.existingEntries = this.existingEntries.filter(
          (treatment) => treatment.id !== entryId
        );

        this.treatments.forEach((originalEntry) => {
          if (originalEntry.id === entryId) {
            originalEntry.side = null;
            originalEntry.sublux = false;
            originalEntry.muscleSpasm = false;
            originalEntry.tenderness = false;
            originalEntry.numbness = false;
            originalEntry.edema = false;
            originalEntry.triggerPoints = false;
            originalEntry.swelling = false;
            originalEntry.reducedMotion = false;
          }
        });
      });
      this.resetComponent();
    },

    async getExistingEntries() {
      this.existingEntries = await this.entryService.getEntriesForNote({
        id: this.$route.params.noteId,
      });
      if (this.existingEntries.length > 0) {
        this.treatments = this.treatments.map((treatment) => {
          const existing = this.existingEntries.find(
            (el) => el.spinalLevel === treatment.spinalLevel
          );
          return existing ? { ...treatment, ...existing } : treatment;
        });
      }
      this.initialEntries = JSON.parse(JSON.stringify(this.treatments));
    },
    backToPatient() {
      this.$router.push(`/patient/${this.$route.params.id}`);
    },
    async handleSave() {
      for (const treatment of this.treatments) {
        if (treatment.side) {
          const matchingEntry = this.existingEntries.find(
            (el) => el.spinalLevel === treatment.spinalLevel
          );

          const isChanged =
            JSON.stringify(treatment) !==
            JSON.stringify(
              this.initialEntries.find(
                (r) => r.spinalLevel === treatment.spinalLevel
              )
            );

          if (isChanged) {
            if (matchingEntry) {
              await this.entryService.updateEntry({
                id: matchingEntry.id,
                ...treatment,
              });

              // now catch existingEntries up
              this.existingEntries = this.existingEntries.filter(
                (treatment) => treatment.id !== matchingEntry.id
              );

              const newEntry = {
                id: matchingEntry.id,
                ...treatment,
              };

              this.existingEntries.push(newEntry);
              this.treatments = spinalEntries;

              if (this.existingEntries.length > 0) {
                this.treatments = this.treatments.map((treatment) => {
                  const existing = this.existingEntries.find(
                    (el) => el.spinalLevel === treatment.spinalLevel
                  );
                  return existing ? { ...treatment, ...existing } : treatment;
                });
              }
              this.initialEntries = JSON.parse(JSON.stringify(this.treatments));
            } else {
              const newEntry = await this.entryService.addEntry({
                ...treatment,
                note: this.$route.params.noteId,
                category: 'spinal',
              });

              // now catch existingEntries up
              this.existingEntries.push(newEntry);
              this.treatments = spinalEntries;
              if (this.existingEntries.length > 0) {
                this.treatments = this.treatments.map((treatment) => {
                  const existing = this.existingEntries.find(
                    (el) => el.spinalLevel === treatment.spinalLevel
                  );
                  return existing ? { ...treatment, ...existing } : treatment;
                });
              }
              this.initialEntries = JSON.parse(JSON.stringify(this.treatments));
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

      console.log('existingEntries at end of day are ', this.existingEntries);
      this.deleteEntries();
    },
    resetComponent() {
      this.existingEntriesToDelete.clear();

      this.editMode = false;
      this.entriesCopy = this.treatments;
    },
    handleCancel() {
      this.editMode = false;
      this.existingEntriesToDelete.clear();
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
