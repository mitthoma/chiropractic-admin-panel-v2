<template>
  <div>
    <v-card>
      <div class="card-header">
        <v-card-title>Ortho Test (Supine)</v-card-title>
        <div class="icon-container">
          <v-icon v-if="!editMode" @click="editMode = true">mdi-pencil</v-icon>
          <div v-if="editMode">
            <v-icon @click="handleCancel">mdi-trash-can</v-icon>
            <v-icon @click="handleSave">mdi-check</v-icon>
          </div>
        </div>
      </div>
      <table class="p-3 orthoSupine-table">
        <tr>
          <th>Name</th>
          <th>WNL</th>
          <th>LT</th>
          <th>RT</th>
          <th>REFERRAL</th>
        </tr>
        <tr v-for="(ortho, index) in orthoSupines" :key="index">
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
          <td v-if="!editMode">{{ ortho.referral || 'None' }}</td>
          <td v-else>
            <input v-model="ortho.referral" type="text" placeholder="None" />
          </td>
        </tr>
      </table>
    </v-card>
  </div>
</template>

<script>
import { createOrthoService } from '~~/services/ortho';

export default {
  name: 'OrthoSupineInput',
  components: {},
  data() {
    return {
      editMode: false,
      orthoSupineService: null,
      existingOrthoSupines: [],
      orthoSupinesCopy: null,
      orthoSupines: [
        {
          name: 'SLR',
          wnl: null,
          lt: null,
          rt: null,
          referral: null,
        },
        {
          name: 'Milgrams',
          wnl: null,
          lt: null,
          rt: null,
          referral: null,
        },
        {
          name: 'Elys',
          wnl: null,
          lt: null,
          rt: null,
          referral: null,
        },
        {
          name: 'Yeomans',
          wnl: null,
          lt: null,
          rt: null,
          referral: null,
        },
        {
          name: 'Fabere Patrick',
          wnl: null,
          lt: null,
          rt: null,
          referral: null,
        },
      ],
    };
  },
  async mounted() {
    this.orthoSupineService = createOrthoService(this.$api);
    await this.getExistingOrthoSupines();
    this.orthoSupinesCopy = JSON.parse(JSON.stringify(this.orthoSupines));
  },
  methods: {
    async getExistingOrthoSupines() {
      this.existingOrthoSupines =
        await this.orthoSupineService.getOrthoSupinesForReport({
          id: this.$route.params.reportId,
        });
      if (this.existingOrthoSupines.length > 0) {
        this.orthoSupines = this.orthoSupines.map((orthoSupine) => {
          const existing = this.existingOrthoSupines.find(
            (el) => el.name === orthoSupine.name
          );
          return existing ? { ...orthoSupine, ...existing } : orthoSupine;
        });
      }
    },
    backToPatient() {
      this.$router.push(`/patient/${this.$route.params.id}`);
    },
    async handleSave() {
      for (const orthoSupine of this.orthoSupines) {
        const matchingOrthoSupine = this.existingOrthoSupines.find(
          (el) => el.name === orthoSupine.name
        );

        const isChanged =
          JSON.stringify(orthoSupine) !==
          JSON.stringify(
            this.orthoSupinesCopy.find((r) => r.name === orthoSupine.name)
          );

        if (isChanged) {
          if (matchingOrthoSupine) {
            const isEmpty = [
              orthoSupine.wnl,
              orthoSupine.lt,
              orthoSupine.rt,
              orthoSupine.referral,
            ].every((field) => !field);
            if (isEmpty) {
              await this.orthoSupineService.deleteOrthoSupine({
                id: matchingOrthoSupine.id,
              });
            } else {
              await this.orthoSupineService.updateOrthoSupine({
                id: matchingOrthoSupine.id,
                ...orthoSupine,
              });
            }
          } else {
            await this.orthoSupineService.addOrthoSupine({
              ...orthoSupine,
              reportId: this.$route.params.reportId,
            });
          }
        }
      }
      this.editMode = false;
      await this.getExistingOrthoSupines();
      this.orthoSupinesCopy = JSON.parse(JSON.stringify(this.orthoSupines));
    },
    async handleCancel() {
      this.editMode = false;
      await this.getExistingOrthoSupines();
      this.orthoSupinesCopy = JSON.parse(JSON.stringify(this.orthoSupines));
    },
  },
};
</script>

<style scoped>
.orthoSupine-table {
  border-radius: 5px;
  width: 100%;
  table-layout: fixed;
  padding: 10px;
}

.orthoSupine-table th,
.orthoSupine-table td {
  padding: 4px;
  text-align: left;
}

.orthoSupine-table input[type='text'] {
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
