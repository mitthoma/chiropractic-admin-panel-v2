<template>
  <div>
    <v-card>
      <div class="card-header">
        <v-card-title>Ortho Test (Seated)</v-card-title>
        <div class="icon-container">
          <v-icon v-if="!editMode" @click="editMode = true">mdi-pencil</v-icon>
          <div v-if="editMode">
            <v-icon @click="handleCancel">mdi-trash-can</v-icon>
            <v-icon @click="handleSave">mdi-check</v-icon>
          </div>
        </div>
      </div>
      <table class="p-3 orthoSeated-table">
        <tr>
          <th>Name</th>
          <th>WNL</th>
          <th>LT</th>
          <th>RT</th>
          <th>REFERRAL</th>
        </tr>
        <tr v-for="(ortho, index) in orthoSeateds" :key="index">
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
  name: 'OrthoSeatedInput',
  components: {},
  data() {
    return {
      editMode: false,
      orthoSeatedService: null,
      existingOrthoSeateds: [],
      orthoSeatedsCopy: null,
      orthoSeateds: [
        {
          name: 'Compression',
          wnl: null,
          lt: null,
          rt: null,
          referral: null,
        },
        {
          name: 'Jacksons Comp',
          wnl: null,
          lt: null,
          rt: null,
          referral: null,
        },
        {
          name: 'Comp w/ Rotation',
          wnl: null,
          lt: null,
          rt: null,
          referral: null,
        },
        {
          name: 'Spurlings',
          wnl: null,
          lt: null,
          rt: null,
          referral: null,
        },
        {
          name: 'Shoulder Dep',
          wnl: null,
          lt: null,
          rt: null,
          referral: null,
        },
        {
          name: 'Kemps',
          wnl: null,
          lt: null,
          rt: null,
          referral: null,
        },
        {
          name: 'Valsalva',
          wnl: null,
          lt: null,
          rt: null,
          referral: null,
        },
        {
          name: 'Becterews',
          wnl: null,
          lt: null,
          rt: null,
          referral: null,
        },
      ],
    };
  },
  async mounted() {
    this.orthoSeatedService = createOrthoService(this.$api);
    await this.getExistingOrthoSeateds();
    this.orthoSeatedsCopy = JSON.parse(JSON.stringify(this.orthoSeateds));
  },
  methods: {
    async getExistingOrthoSeateds() {
      this.existingOrthoSeateds =
        await this.orthoSeatedService.getOrthoSeatedsForReport({
          id: this.$route.params.reportId,
        });
      if (this.existingOrthoSeateds.length > 0) {
        this.orthoSeateds = this.orthoSeateds.map((orthoSeated) => {
          const existing = this.existingOrthoSeateds.find(
            (el) => el.name === orthoSeated.name
          );
          return existing ? { ...orthoSeated, ...existing } : orthoSeated;
        });
      }
    },
    backToPatient() {
      this.$router.push(`/patient/${this.$route.params.id}`);
    },
    async handleSave() {
      for (const orthoSeated of this.orthoSeateds) {
        const matchingOrthoSeated = this.existingOrthoSeateds.find(
          (el) => el.name === orthoSeated.name
        );

        const isChanged =
          JSON.stringify(orthoSeated) !==
          JSON.stringify(
            this.orthoSeatedsCopy.find((r) => r.name === orthoSeated.name)
          );

        if (isChanged) {
          if (matchingOrthoSeated) {
            const isEmpty = [
              orthoSeated.wnl,
              orthoSeated.lt,
              orthoSeated.rt,
              orthoSeated.referral,
            ].every((field) => !field);
            if (isEmpty) {
              await this.orthoSeatedService.deleteOrthoSeated({
                id: matchingOrthoSeated.id,
              });
            } else {
              await this.orthoSeatedService.updateOrthoSeated({
                id: matchingOrthoSeated.id,
                ...orthoSeated,
              });
            }
          } else {
            await this.orthoSeatedService.addOrthoSeated({
              ...orthoSeated,
              reportId: this.$route.params.reportId,
            });
          }
        }
      }
      this.editMode = false;
      await this.getExistingOrthoSeateds();
      this.orthoSeatedsCopy = JSON.parse(JSON.stringify(this.orthoSeateds));
    },
    async handleCancel() {
      this.editMode = false;
      await this.getExistingOrthoSeateds();
      this.orthoSeatedsCopy = JSON.parse(JSON.stringify(this.orthoSeateds));
    },
  },
};
</script>

<style scoped>
.orthoSeated-table {
  border-radius: 5px;
  width: 100%;
  table-layout: fixed;
  padding: 10px;
}

.orthoSeated-table th,
.orthoSeated-table td {
  padding: 4px;
  text-align: left;
}

.orthoSeated-table input[type='text'] {
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
