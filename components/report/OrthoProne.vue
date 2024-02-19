<template>
  <div>
    <v-card>
      <div class="card-header">
        <v-card-title>Ortho Test (Prone)</v-card-title>
        <div class="icon-container">
          <v-icon v-if="!editMode" @click="editMode = true">mdi-pencil</v-icon>
          <div v-if="editMode">
            <v-icon @click="handleCancel">mdi-trash-can</v-icon>
            <v-icon @click="handleSave">mdi-check</v-icon>
          </div>
        </div>
      </div>
      <table class="p-3 orthoProne-table">
        <tr>
          <th>Name</th>
          <th>WNL</th>
          <th>LT</th>
          <th>RT</th>
          <th>REFERRAL</th>
        </tr>
        <tr v-for="(ortho, index) in orthoPrones" :key="index">
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
  name: 'OrthoProneInput',
  components: {},
  data() {
    return {
      editMode: false,
      orthoService: null,
      existingOrthoPrones: [],
      orthoPronesCopy: null,
      orthoPrones: [
        {
          name: 'Nachlas',
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
          name: 'Hibbs',
          wnl: null,
          lt: null,
          rt: null,
          referral: null,
        },
      ],
    };
  },
  async mounted() {
    this.orthoService = createOrthoService(this.$api);
    await this.getExistingOrthoPrones();
    this.orthoPronesCopy = JSON.parse(JSON.stringify(this.orthoPrones));
  },
  methods: {
    async getExistingOrthoPrones() {
      this.existingOrthoPrones =
        await this.orthoService.getOrthoPronesForReport({
          id: this.$route.params.reportId,
        });
      if (this.existingOrthoPrones.length > 0) {
        this.orthoPrones = this.orthoPrones.map((orthoProne) => {
          const existing = this.existingOrthoPrones.find(
            (el) => el.name === orthoProne.name
          );
          return existing ? { ...orthoProne, ...existing } : orthoProne;
        });
      }
    },
    backToPatient() {
      this.$router.push(`/patient/${this.$route.params.id}`);
    },
    async handleSave() {
      for (const orthoProne of this.orthoPrones) {
        const matchingOrthoProne = this.existingOrthoPrones.find(
          (el) => el.name === orthoProne.name
        );

        const isChanged =
          JSON.stringify(orthoProne) !==
          JSON.stringify(
            this.orthoPronesCopy.find((r) => r.name === orthoProne.name)
          );

        if (isChanged) {
          if (matchingOrthoProne) {
            const isEmpty = [
              orthoProne.wnl,
              orthoProne.lt,
              orthoProne.rt,
              orthoProne.referral,
            ].every((field) => !field);
            if (isEmpty) {
              await this.orthoProneService.deleteOrthoProne({
                id: matchingOrthoProne.id,
              });
            } else {
              await this.orthoProneService.updateOrthoProne({
                id: matchingOrthoProne.id,
                ...orthoProne,
              });
            }
          } else {
            await this.orthoProneService.addOrthoProne({
              ...orthoProne,
              reportId: this.$route.params.reportId,
            });
          }
        }
      }
      this.editMode = false;
      await this.getExistingOrthoPrones();
      this.orthoPronesCopy = JSON.parse(JSON.stringify(this.orthoPrones));
    },
    async handleCancel() {
      this.editMode = false;
      await this.getExistingOrthoPrones();
      this.orthoPronesCopy = JSON.parse(JSON.stringify(this.orthoPrones));
    },
  },
};
</script>

<style scoped>
.orthoProne-table {
  border-radius: 5px;
  width: 100%;
  table-layout: fixed;
  padding: 10px;
}

.orthoProne-table th,
.orthoProne-table td {
  padding: 4px;
  text-align: left;
}

.orthoProne-table input[type='text'] {
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
