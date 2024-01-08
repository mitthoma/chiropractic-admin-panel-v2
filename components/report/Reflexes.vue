<template>
  <div>
    <v-card>
      <div class="card-header">
        <v-card-title>Reflexes</v-card-title>
        <div class="icon-container">
          <v-icon v-if="!editMode" @click="editMode = true">mdi-pencil</v-icon>
          <div v-if="editMode">
            <v-icon @click="handleCancel">mdi-trash-can</v-icon>
            <v-icon @click="handleSave">mdi-check</v-icon>
          </div>
        </div>
      </div>
      <table class="p-3 reflexes-table">
        <tr>
          <th>Label</th>
          <th>WNL</th>
          <th>LT</th>
          <th>RT</th>
          <th>Notes</th>
        </tr>
        <tr v-for="(reflex, index) in reflexes" :key="index">
          <td>{{ reflex.name }}</td>
          <td v-if="!editMode">{{ reflex.wnl || 'None' }}</td>
          <td v-else>
            <input v-model="reflex.wnl" type="text" placeholder="None" />
          </td>
          <td v-if="!editMode">{{ reflex.lt || 'None' }}</td>
          <td v-else>
            <input v-model="reflex.lt" type="text" placeholder="None" />
          </td>
          <td v-if="!editMode">{{ reflex.rt || 'None' }}</td>
          <td v-else>
            <input v-model="reflex.rt" type="text" placeholder="None" />
          </td>
          <td v-if="!editMode">{{ reflex.notes || 'None' }}</td>
          <td v-else>
            <input v-model="reflex.notes" type="text" placeholder="None" />
          </td>
        </tr>
      </table>
    </v-card>
  </div>
</template>

<script>
import { createReflexesService } from '~~/services/reflexes';

export default {
  name: 'ReflexesInput',
  components: {},
  data() {
    return {
      editMode: false,
      reflexesService: null,
      existingReflexes: [],
      reflexesCopy: null,
      reflexes: [
        {
          name: 'Biceps: C5',
          wnl: null,
          lt: null,
          rt: null,
          notes: null,
        },
        {
          name: 'Brachio: C6',
          wnl: null,
          lt: null,
          rt: null,
          notes: null,
        },
        {
          name: 'Triceps: C7',
          wnl: null,
          lt: null,
          rt: null,
          notes: null,
        },
        {
          name: 'Patellar: L4',
          wnl: null,
          lt: null,
          rt: null,
          notes: null,
        },
        {
          name: 'Achilles: S1',
          wnl: null,
          lt: null,
          rt: null,
          notes: null,
        },
      ],
    };
  },
  async mounted() {
    this.reflexesService = createReflexesService(this.$api);
    await this.getExistingReflexes();
    this.reflexesCopy = JSON.parse(JSON.stringify(this.reflexes));
  },
  methods: {
    async getExistingReflexes() {
      this.existingReflexes = await this.reflexesService.getReflexesForReport({
        id: this.$route.params.reportId,
      });
      if (this.existingReflexes.length > 0) {
        this.reflexes = this.reflexes.map((reflexes) => {
          const existing = this.existingReflexes.find(
            (el) => el.name === reflexes.name
          );
          return existing ? { ...reflexes, ...existing } : reflexes;
        });
      }
    },
    backToPatient() {
      this.$router.push(`/patient/${this.$route.params.id}`);
    },
    async handleSave() {
      for (const reflexes of this.reflexes) {
        if (reflexes.arom || reflexes.pain || reflexes.notes) {
          const matchingReflexes = this.existingReflexes.find(
            (el) => el.name === reflexes.name
          );

          if (matchingReflexes) {
            await this.reflexesService.updateReflexes({
              id: matchingReflexes.id,
              ...reflexes,
            });
          } else {
            await this.reflexesService.addReflexes({
              ...reflexes,
              reportId: this.$route.params.reportId,
            });
          }
        } else {
          const reflexesToDelete = this.existingReflexes.find(
            (el) => el.name === reflexes.name
          );
          if (reflexesToDelete) {
            await this.reflexesService.deleteReflexes({
              id: reflexesToDelete.id,
            });
          }
        }
      }
      this.reflexesCopy = JSON.parse(JSON.stringify(this.reflexes));
      this.editMode = false;
    },
    async handleCancel() {
      this.editMode = false;
      await this.getExistingReflexes();
      this.reflexesCopy = JSON.parse(JSON.stringify(this.reflexes));
    },
  },
};
</script>

<style scoped>
.reflexes-table {
  border-radius: 5px;
  width: 100%;
  table-layout: fixed;
  padding: 10px;
}

.reflexes-table th,
.reflexes-table td {
  padding: 4px;
  text-align: left;
}

.reflexes-table input[type='text'] {
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
</style>
