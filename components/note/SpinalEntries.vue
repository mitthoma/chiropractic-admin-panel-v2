<template>
  <div>
    <v-card>
      <div class="card-header">
        <v-card-title>Spinal Entries</v-card-title>
        <div class="icon-container">
          <v-icon v-if="!editMode" @click="editMode = true">mdi-pencil</v-icon>
          <div v-if="editMode">
            <v-icon @click="handleCancel">mdi-trash-can</v-icon>
            <v-icon @click="handleSave">mdi-check</v-icon>
          </div>
        </div>
      </div>
      <table class="p-3 entry-table">
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

        <tr v-for="(entry, index) in entries" :key="index" class="entry-row">
          <td>{{ entry.spinalLevel }}</td>
          <td v-if="!editMode">{{ entry.side || 'None' }}</td>
          <td v-else>
            <input v-model="entry.side" type="text" placeholder="None" />
          </td>
          <td v-if="!editMode">
            <SvgRender v-if="entry.sublux" :width="20" :height="20" icon="x" />
          </td>
          <td
            v-else
            class="editable-field"
            @click="toggleField(entry, 'sublux')"
          >
            <SvgRender v-if="entry.sublux" :width="20" :height="20" icon="x" />
          </td>
          <td v-if="!editMode">{{ entry.muscleSpasm || 'None' }}</td>
          <td v-else>
            <input v-model="entry.muscleSpasm" type="text" placeholder="None" />
          </td>
          <td v-if="!editMode">{{ entry.triggerPoints || 'None' }}</td>
          <td v-else>
            <input
              v-model="entry.triggerPoints"
              type="text"
              placeholder="None"
            />
          </td>
          <td
            v-if="
              editMode &&
              existingEntries.some((e) => e.spinalLevel === entry.spinalLevel)
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
      entries: [],
      painOptions: [
        { text: '+', value: '1' },
        { text: '++', value: '2' },
        { text: '+++', value: '3' },
        { text: '++++', value: '4' },
        { text: '+++++', value: '5' },
      ],
      existingEntriesToDelete: [],
    };
  },
  async mounted() {
    this.entries = spinalEntries;
    this.entryService = await createEntryService(this.$api);
    await this.getExistingEntries();
    this.entriesCopy = JSON.parse(JSON.stringify(this.entries));
  },
  methods: {
    toggleField(entry, field) {
      console.log('CLICKING TOGGLE');
      entry[field] = !entry[field];
      console.log('entry.field is ', entry[field]);
    },
    handleRowClear(level) {
      console.log('level is ', level);
      // level corresponds to spinal level
      // reference existingEntries by spinal level and pull the id from it
      // store the id in existingEntriesToDelete
      // once we save our progress, then we'll go through that array and delete the entries for good
    },

    async deleteEntries() {
      // go through the array existingEntriesToDelete and just make delete api call with their id
      await this.entryService.deleteEntry();
      this.existingEntriesToDelete = [];
    },

    async getExistingEntries() {
      this.existingEntries = await this.entryService.getEntriesForNote({
        id: this.$route.params.noteId,
      });
      if (this.existingEntries.length > 0) {
        console.log(
          'existing entries! and the length is ',
          this.existingEntries.length
        );
        this.entries = this.entries.map((entry) => {
          const existing = this.existingEntries.find(
            (el) => el.spinalLevel === entry.spinalLevel
          );
          return existing ? { ...entry, ...existing } : entry;
        });
      }
    },
    backToPatient() {
      this.$router.push(`/patient/${this.$route.params.id}`);
    },
    async handleSave() {
      console.log('ENTRIES ARE ', this.entries);
      for (const entry of this.entries) {
        if (entry.side) {
          console.log('ENTRY IS ', entry);
          const matchingEntry = this.existingEntries.find(
            (el) => el.name === entry.name
          );
          console.log('matching entry is ', matchingEntry);

          const isChanged =
            JSON.stringify(entry) !==
            JSON.stringify(this.entriesCopy.find((r) => r.name === entry.name));
          console.log('IS CHANGED IS ', isChanged);

          if (isChanged) {
            if (matchingEntry) {
              console.log('MATCHING ENTRY IS ', matchingEntry);
              console.log('sublux is ', entry.sublux);
              await this.entryService.updateEntry({
                id: matchingEntry.id,
                ...entry,
              });
            } else {
              console.log('adding entry');
              await this.entryService.addEntry({
                ...entry,
                note: this.$route.params.noteId,
                category: 'spinal',
              });
            }
          }
        }
      }
      await this.deleteEntries();
      this.editMode = false;
      await this.getExistingEntries();
      this.entriesCopy = JSON.parse(JSON.stringify(this.entries));
    },
    async handleCancel() {
      this.editMode = false;
      await this.getExistingEntries();
      this.entriesCopy = JSON.parse(JSON.stringify(this.entries));
    },
  },
};
</script>

<style scoped>
.entry-table {
  border-radius: 5px;
  width: 100%;
  table-layout: fixed;
  padding: 10px;
  text-align: center;
}

.entry-row {
}

.entry-table th,
.entry-table td {
  padding: 16px 4px;
}

.entry-table td {
  border: 1px solid black;
}

.entry-table th {
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

.entry-table input[type='text'] {
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
</style>
