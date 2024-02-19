<template>
  <div>
    <v-card>
      <div class="card-header">
        <v-card-title>Ortho Test (Standing)</v-card-title>
        <div class="icon-container">
          <v-icon v-if="!editMode" @click="editMode = true">mdi-pencil</v-icon>
          <div v-if="editMode">
            <v-icon @click="handleCancel">mdi-trash-can</v-icon>
            <v-icon @click="handleSave">mdi-check</v-icon>
          </div>
        </div>
      </div>
      <table class="p-3 orthoStanding-table">
        <tr>
          <th>Name</th>
          <th>WNL</th>
          <th>LT</th>
          <th>RT</th>
          <th>PAIN</th>
        </tr>
        <tr v-for="(ortho, index) in orthoStandings" :key="index">
          <td>{{ ortho.name }}</td>
          <td v-if="!editMode">{{ ortho.wnl || 'None' }}</td>
          <td v-else>
            <input v-model="ortho.wnl" type="text" placeholder="None" />
          </td>
          <td v-if="!editMode">{{ ortho.lt || 'None' }}</td>
          <td v-else>
            <input v-model="ortho.lt" type="text" placeholder="None" />
          </td>
          <td v-if="!editMode">{{ ortho.rt || 'None' }}</td>
          <td v-else>
            <input v-model="ortho.rt" type="text" placeholder="None" />
          </td>
          <td v-if="!editMode">{{ ortho.pain || 'None' }}</td>
          <td v-else>
            <input v-model="ortho.pain" type="text" placeholder="None" />
          </td>
        </tr>
      </table>
    </v-card>
  </div>
</template>

<script>
import { createOrthoService } from '~~/services/ortho';

export default {
  name: 'OrthoStandingInput',
  components: {},
  data() {
    return {
      editMode: false,
      orthoService: null,
      existingOrthoStandings: [],
      orthoStandingsCopy: null,
      orthoStandings: [
        {
          name: 'Heel / Toe Walking',
          wnl: null,
          lt: null,
          rt: null,
          pain: null,
        },
        {
          name: 'Trendelenburg',
          wnl: null,
          lt: null,
          rt: null,
          pain: null,
        },
        {
          name: 'Other',
          wnl: null,
          lt: null,
          rt: null,
          pain: null,
        },
      ],
    };
  },
  async mounted() {
    this.orthoService = createOrthoService(this.$api);
    await this.getExistingOrthoStandings();
    this.orthoStandingsCopy = JSON.parse(JSON.stringify(this.orthoStandings));
  },
  methods: {
    async getExistingOrthoStandings() {
      this.existingOrthoStandings =
        await this.orthoService.getOrthoStandingsForReport({
          id: this.$route.params.reportId,
        });
      if (this.existingOrthoStandings.length > 0) {
        this.orthoStandings = this.orthoStandings.map((orthoStanding) => {
          const existing = this.existingOrthoStandings.find(
            (el) => el.name === orthoStanding.name
          );
          return existing ? { ...orthoStanding, ...existing } : orthoStanding;
        });
      }
    },
    backToPatient() {
      this.$router.push(`/patient/${this.$route.params.id}`);
    },
    async handleSave() {
      for (const orthoStanding of this.orthoStandings) {
        const matchingOrthoStanding = this.existingOrthoStandings.find(
          (el) => el.name === orthoStanding.name
        );

        const isChanged =
          JSON.stringify(orthoStanding) !==
          JSON.stringify(
            this.orthoStandingsCopy.find((r) => r.name === orthoStanding.name)
          );

        if (isChanged) {
          if (matchingOrthoStanding) {
            const isEmpty = [
              orthoStanding.wnl,
              orthoStanding.lt,
              orthoStanding.rt,
              orthoStanding.pain,
            ].every((field) => !field);
            if (isEmpty) {
              await this.orthoStandingService.deleteOrthoStanding({
                id: matchingOrthoStanding.id,
              });
            } else {
              await this.orthoStandingService.updateOrthoStanding({
                id: matchingOrthoStanding.id,
                ...orthoStanding,
              });
            }
          } else {
            await this.orthoStandingService.addOrthoStanding({
              ...orthoStanding,
              reportId: this.$route.params.reportId,
            });
          }
        }
      }
      this.editMode = false;
      await this.getExistingOrthoStandings();
      this.orthoStandingsCopy = JSON.parse(JSON.stringify(this.orthoStandings));
    },
    async handleCancel() {
      this.editMode = false;
      await this.getExistingOrthoStandings();
      this.orthoStandingsCopy = JSON.parse(JSON.stringify(this.orthoStandings));
    },
  },
};
</script>

<style scoped>
.orthoStanding-table {
  border-radius: 5px;
  width: 100%;
  table-layout: fixed;
  padding: 10px;
}

.orthoStanding-table th,
.orthoStanding-table td {
  padding: 4px;
  text-align: left;
}

.orthoStanding-table input[type='text'] {
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
