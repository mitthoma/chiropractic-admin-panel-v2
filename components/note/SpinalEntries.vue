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
        </tr>
        <tr v-for="(entry, index) in entries" :key="index">
          <td>{{ entry.spinalLevel }}</td>
          <td v-if="!editMode">{{ entry.side || 'None' }}</td>
          <td v-else>
            <input v-model="entry.side" type="text" placeholder="None" />
          </td>
          <td
            v-if="!editMode"
            class="editable-field"
            @click="toggleField(entry, 'sublux')"
          >
            <SvgRender v-if="entry.sublux" :width="20" :height="20" icon="x" />
          </td>
          <td v-else>
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
      if (this.editMode) {
        entry[field] = !entry[field];
      }
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
      for (const entry of this.entries) {
        const matchingEntry = this.existingEntries.find(
          (el) => el.name === entry.name
        );

        const isChanged =
          JSON.stringify(entry) !==
          JSON.stringify(this.entriesCopy.find((r) => r.name === entry.name));

        if (isChanged) {
          if (matchingEntry) {
            const isEmpty = [
              entry.norm,
              entry.pain,
              entry.arom,
              entry.notes,
            ].every((field) => !field);
            if (isEmpty) {
              await this.entryService.deleteEntry({
                id: matchingEntry.id,
              });
            } else {
              await this.entryService.updateEntry({
                id: matchingEntry.id,
                ...entry,
              });
            }
          } else {
            await this.entryService.addEntry({
              ...entry,
              noteId: this.$route.params.noteId,
            });
          }
        }
      }
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

.entry-table th,
.entry-table td {
  padding: 4px;
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
</style>
