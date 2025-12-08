<template>
  <div>
    <v-card>
      <div class="card-header">
        <v-card-title>Objective Findings - Extremity</v-card-title>
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
          <td>{{ transformLabel(entry.extremityLevel) }}</td>
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
                (e) => e.extremityLevel === entry.extremityLevel
              )
            "
          >
            <v-btn
              text
              color="red"
              @click="handleRowClear(entry.extremityLevel)"
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
import { extremityEntries } from './helpers/constants';
import { createEntryService } from '~~/services/entry';

export default {
  name: 'ExtremityEntries',
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
    const { demoStore } = await import('~/store/demo');
    const demo = demoStore();

    if (demo.getIsDemo) {
      // Load demo extremity entries
      const noteId = this.$route.params.noteId;
      this.entries = demo.getNoteExtremityEntries(noteId);
      this.entriesToDelete = new Set();
      this.existingEntriesToDelete = new Set();
    } else {
      this.entries = extremityEntries;
      this.entryService = createEntryService(this.$api);
      await this.getExistingEntries();
    }
  },
  methods: {
    startEditMode() {
      this.editMode = true;
      this.entriesCopy = JSON.parse(JSON.stringify(this.entries));
    },
    transformLabel(label) {
      return label.charAt(0).toUpperCase() + label.slice(1);
    },
    toggleField(entry, field) {
      entry[field] = !entry[field];
    },
    handleRowClear(level) {
      this.entriesCopy.forEach((entry) => {
        if (entry.extremityLevel === level) {
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
            (el) => el.extremityLevel === entry.extremityLevel
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
            (el) => el.extremityLevel === entry.extremityLevel
          );

          const isChanged =
            JSON.stringify(entry) !==
            JSON.stringify(
              this.initialEntries.find(
                (r) => r.extremityLevel === entry.extremityLevel
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
              this.entries = extremityEntries;

              if (this.existingEntries.length > 0) {
                this.entries = this.entries.map((entry) => {
                  const existing = this.existingEntries.find(
                    (el) => el.extremityLevel === entry.extremityLevel
                  );
                  return existing ? { ...entry, ...existing } : entry;
                });
              }
              this.initialEntries = JSON.parse(JSON.stringify(this.entries));
            } else {
              const newEntry = await this.entryService.addEntry({
                ...entry,
                note: this.$route.params.noteId,
                category: 'extremity',
              });

              // now catch existingEntries up
              this.existingEntries.push(newEntry);
              this.entries = extremityEntries;
              if (this.existingEntries.length > 0) {
                this.entries = this.entries.map((entry) => {
                  const existing = this.existingEntries.find(
                    (el) => el.extremityLevel === entry.extremityLevel
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
