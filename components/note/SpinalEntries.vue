<template>
  <div>
    <v-card class="p-3">
      <div class="card-header">
        <v-card-title>Objective Findings - Spinal</v-card-title>
        <div class="icon-container">
          <v-icon v-if="!editMode" @click="startEditMode">mdi-pencil</v-icon>
          <div v-if="editMode">
            <v-icon @click="handleCancel">mdi-trash-can</v-icon>
            <v-icon @click="handleSave">mdi-check</v-icon>
          </div>
        </div>
      </div>
      <table class="p-3 entry-table">
        <tr class="table-heading-row">
          <th>
            <div class="outer"><p class="inner">Level</p></div>
          </th>
          <th>
            <div class="outer"><p class="inner">Side</p></div>
          </th>
          <th>
            <div class="outer"><p class="inner">Sublux</p></div>
          </th>
          <th>
            <div class="outer"><p class="inner">Muscle Spasm</p></div>
          </th>
          <th>
            <div class="outer"><p class="inner">Trigger Points</p></div>
          </th>
          <th>
            <div class="outer"><p class="inner">Tenderness</p></div>
          </th>
          <th>
            <div class="outer"><p class="inner">Numbness</p></div>
          </th>
          <th>
            <div class="outer"><p class="inner">Edema</p></div>
          </th>
          <th>
            <div class="outer"><p class="inner">Swelling</p></div>
          </th>
          <th>
            <div class="outer"><p class="inner">Reduced Motion</p></div>
          </th>

          <th v-if="editMode">Actions</th>
        </tr>

        <tr v-for="(entry, index) in entrySet" :key="index" class="entry-row">
          <td>{{ transformLabel(entry.spinalLevel) }}</td>
          <td v-if="!editMode">
            {{
              entry.side === 'l'
                ? 'Left'
                : entry.side === 'r'
                  ? 'Right'
                  : entry.side === 'b'
                    ? 'Both'
                    : 'None'
            }}
          </td>
          <td v-else>
            <v-select
              v-model="entry.side"
              :items="sideOptions"
              item-text="title"
              item-value="value"
              label="Select Side"
              v-bind="{ 'return-object': false }"
            ></v-select>
          </td>
          <td v-if="!editMode">
            <SvgRender v-if="entry.sublux" :width="15" :height="15" icon="x" />
          </td>
          <td
            v-else
            class="editable-field"
            @click="toggleField(entry, 'sublux')"
          >
            <SvgRender v-if="entry.sublux" :width="15" :height="15" icon="x" />
          </td>
          <td v-if="!editMode">
            <SvgRender
              v-if="entry.muscleSpasm"
              :width="15"
              :height="15"
              icon="x"
            />
          </td>
          <td
            v-else
            class="editable-field"
            @click="toggleField(entry, 'muscleSpasm')"
          >
            <SvgRender
              v-if="entry.muscleSpasm"
              :width="15"
              :height="15"
              icon="x"
            />
          </td>
          <td v-if="!editMode">
            <SvgRender
              v-if="entry.triggerPoints"
              :width="15"
              :height="15"
              icon="x"
            />
          </td>
          <td
            v-else
            class="editable-field"
            @click="toggleField(entry, 'triggerPoints')"
          >
            <SvgRender
              v-if="entry.triggerPoints"
              :width="15"
              :height="15"
              icon="x"
            />
          </td>
          <td v-if="!editMode">
            <SvgRender
              v-if="entry.tenderness"
              :width="15"
              :height="15"
              icon="x"
            />
          </td>
          <td
            v-else
            class="editable-field"
            @click="toggleField(entry, 'tenderness')"
          >
            <SvgRender
              v-if="entry.tenderness"
              :width="15"
              :height="15"
              icon="x"
            />
          </td>
          <td v-if="!editMode">
            <SvgRender
              v-if="entry.numbness"
              :width="15"
              :height="15"
              icon="x"
            />
          </td>
          <td
            v-else
            class="editable-field"
            @click="toggleField(entry, 'numbness')"
          >
            <SvgRender
              v-if="entry.numbness"
              :width="15"
              :height="15"
              icon="x"
            />
          </td>
          <td v-if="!editMode">
            <SvgRender v-if="entry.edema" :width="15" :height="15" icon="x" />
          </td>
          <td
            v-else
            class="editable-field"
            @click="toggleField(entry, 'edema')"
          >
            <SvgRender v-if="entry.edema" :width="15" :height="15" icon="x" />
          </td>
          <td v-if="!editMode">
            <SvgRender
              v-if="entry.swelling"
              :width="15"
              :height="15"
              icon="x"
            />
          </td>
          <td
            v-else
            class="editable-field"
            @click="toggleField(entry, 'swelling')"
          >
            <SvgRender
              v-if="entry.swelling"
              :width="15"
              :height="15"
              icon="x"
            />
          </td>
          <td v-if="!editMode">
            <SvgRender
              v-if="entry.reducedMotion"
              :width="15"
              :height="15"
              icon="x"
            />
          </td>
          <td
            v-else
            class="editable-field"
            @click="toggleField(entry, 'reducedMotion')"
          >
            <SvgRender
              v-if="entry.reducedMotion"
              :width="15"
              :height="15"
              icon="x"
            />
          </td>
          <td
            v-if="
              editMode &&
              existingShownEntries.some(
                (e) => e.spinalLevel === entry.spinalLevel
              )
            "
          >
            <v-btn text color="red" @click="handleRowClear(entry.spinalLevel)">
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
import { createEntryService } from '~~/services/entry';

export default {
  name: 'SpinalEntries',
  components: { SvgRender },
  data() {
    return {
      editMode: false,
      entryService: null,
      existingEntries: [],
      entriesCopy: null,
      initialEntries: null,
      entries: [],
      existingEntriesToDelete: new Set(),
    };
  },
  computed: {
    entrySet() {
      return this.editMode ? this.entriesCopy : this.entries;
    },
    sideOptions() {
      return sides;
    },
    existingShownEntries() {
      return this.existingEntries;
    },
  },
  async mounted() {
    this.entries = spinalEntries;
    this.entryService = createEntryService(this.$api);
    await this.getExistingEntries();
  },
  methods: {
    startEditMode() {
      this.editMode = true;
      this.entriesCopy = JSON.parse(JSON.stringify(this.entries));
    },
    transformLabel(label) {
      return label
        .split('_')
        .map((part) => part.toUpperCase())
        .join(' - ');
    },
    toggleField(entry, field) {
      entry[field] = !entry[field];
    },
    handleRowClear(level) {
      this.entriesCopy.forEach((entry) => {
        if (entry.spinalLevel === level) {
          this.existingEntriesToDelete.add(entry.id);
          entry.side = null;
          entry.sublux = false;
          entry.muscleSpasm = false;
          entry.tenderness = false;
          entry.numbness = false;
          entry.edema = false;
          entry.triggerPoints = false;
          entry.swelling = false;
          entry.reducedMotion = false;
        }
      });
    },

    deleteEntries() {
      this.existingEntriesToDelete.forEach(async (entryId) => {
        await this.entryService.deleteEntry({ id: entryId });
        this.existingEntries = this.existingEntries.filter(
          (entry) => entry.id !== entryId
        );

        this.entries.forEach((originalEntry) => {
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
        this.entries = this.entries.map((entry) => {
          const existing = this.existingEntries.find(
            (el) => el.spinalLevel === entry.spinalLevel
          );
          return existing ? { ...entry, ...existing } : entry;
        });
      }
      this.initialEntries = JSON.parse(JSON.stringify(this.entries));
    },
    backToPatient() {
      this.$router.push(`/patient/${this.$route.params.id}`);
    },
    async handleSave() {
      this.entries = JSON.parse(JSON.stringify(this.entriesCopy));
      for (const entry of this.entries) {
        if (entry.side) {
          const matchingEntry = this.existingEntries.find(
            (el) => el.spinalLevel === entry.spinalLevel
          );

          const isChanged =
            JSON.stringify(entry) !==
            JSON.stringify(
              this.initialEntries.find(
                (r) => r.spinalLevel === entry.spinalLevel
              )
            );

          if (isChanged) {
            if (matchingEntry) {
              await this.entryService.updateEntry({
                id: matchingEntry.id,
                ...entry,
              });

              // now catch existingEntries up
              this.existingEntries = this.existingEntries.filter(
                (entry) => entry.id !== matchingEntry.id
              );

              const newEntry = {
                id: matchingEntry.id,
                ...entry,
              };

              this.existingEntries.push(newEntry);
              this.entries = spinalEntries;

              if (this.existingEntries.length > 0) {
                this.entries = this.entries.map((entry) => {
                  const existing = this.existingEntries.find(
                    (el) => el.spinalLevel === entry.spinalLevel
                  );
                  return existing ? { ...entry, ...existing } : entry;
                });
              }
              this.initialEntries = JSON.parse(JSON.stringify(this.entries));
            } else {
              const newEntry = await this.entryService.addEntry({
                ...entry,
                note: this.$route.params.noteId,
                category: 'spinal',
              });

              // now catch existingEntries up
              this.existingEntries.push(newEntry);
              this.entries = spinalEntries;
              if (this.existingEntries.length > 0) {
                this.entries = this.entries.map((entry) => {
                  const existing = this.existingEntries.find(
                    (el) => el.spinalLevel === entry.spinalLevel
                  );
                  return existing ? { ...entry, ...existing } : entry;
                });
              }
              this.initialEntries = JSON.parse(JSON.stringify(this.entries));
            }
          }
        } else {
          entry.side = null;
          entry.sublux = false;
          entry.muscleSpasm = false;
          entry.tenderness = false;
          entry.numbness = false;
          entry.edema = false;
          entry.triggerPoints = false;
          entry.swelling = false;
          entry.reducedMotion = false;
        }
      }

      this.deleteEntries();
    },
    resetComponent() {
      this.existingEntriesToDelete.clear();

      this.editMode = false;
      this.entriesCopy = this.entries;
    },
    handleCancel() {
      this.entriesCopy = JSON.parse(JSON.stringify(this.entries));
      this.editMode = false;
      this.existingEntriesToDelete = new Set();
    },
  },
};
</script>

<style scoped>
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

.entry-table {
  border-radius: 5px;
  width: 100%;
  text-align: center;
  padding-left: 10%;
  padding-right: 10%;
  padding-top: 2%;
  padding-bottom: 2%;
}
</style>

<!-- <style scoped>
.entry-table {
  border-radius: 5px;
  width: 100%;
  table-layout: fixed;
  padding: 10px;
  text-align: center;
}

.entry-table th,
.entry-table td {
  padding: 2px 2px;
  width: 22px !important;
}

.entry-table td {
  /* border: 1px solid black; */
}

.entry-table th {
  font-size: 12px;
  transform: rotate(90deg);
  text-wrap: wrap;
  white-space: nowrap; /* Prevent words from breaking */
  overflow-wrap: break-word; /* Handle word breaking correctly */
  word-break: break-word; /* Handle word breaking correctly */
}

.table-heading-row {
  height: 10vh;
  padding-top: 15px;
  padding-bottom: 15px;
  margin-bottom: 100px !important;
}

.entry-table input[type='text'] {
  /* width: 100%; */
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

.entry-table th {
  /* border-right: 30px solid transparent; */
}
</style> -->
