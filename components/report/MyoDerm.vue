<template>
  <div>
    <v-card>
      <div class="card-header">
        <v-card-title>MyoDerm</v-card-title>
        <div class="icon-container">
          <v-icon v-if="!editMode" @click="editMode = true">mdi-pencil</v-icon>
          <div v-if="editMode">
            <v-icon @click="handleCancel">mdi-trash-can</v-icon>
            <v-icon @click="handleSave">mdi-check</v-icon>
          </div>
        </div>
      </div>
      <table class="p-3 myoDerm-table">
        <tr>
          <th>Label</th>
          <th>WNL</th>
          <th>LT</th>
          <th>RT</th>
          <th>Notes</th>
        </tr>
        <tr v-for="(myoDerm, index) in myoDerms" :key="index">
          <td>{{ myoDerm.name }}</td>
          <td v-if="!editMode">{{ myoDerm.wnl || 'None' }}</td>
          <td v-else>
            <input v-model="myoDerm.wnl" type="text" placeholder="None" />
          </td>
          <td v-if="!editMode">{{ myoDerm.lt || 'None' }}</td>
          <td v-else>
            <input v-model="myoDerm.lt" type="text" placeholder="None" />
          </td>
          <td v-if="!editMode">{{ myoDerm.rt || 'None' }}</td>
          <td v-else>
            <input v-model="myoDerm.rt" type="text" placeholder="None" />
          </td>
          <td v-if="!editMode">{{ myoDerm.notes || 'None' }}</td>
          <td v-else>
            <input v-model="myoDerm.notes" type="text" placeholder="None" />
          </td>
        </tr>
      </table>
    </v-card>
  </div>
</template>

<script>
import { createMyoDermService } from '~~/services/myoDerm';

export default {
  name: 'MyoDermInput',
  components: {},
  data() {
    return {
      editMode: false,
      myoDermService: null,
      existingMyoDerms: [],
      myoDermsCopy: null,
      myoDerms: [
        {
          name: 'C5, C6, C7, C8, T1',
          wnl: null,
          lt: null,
          rt: null,
          notes: null,
        },
        {
          name: 'T12, L1, L2',
          wnl: null,
          lt: null,
          rt: null,
          notes: null,
        },
        {
          name: 'L4, L5, S1',
          wnl: null,
          lt: null,
          rt: null,
          notes: null,
        },
      ],
    };
  },
  async mounted() {
    this.myoDermService = createMyoDermService(this.$api);
    await this.getExistingMyoDerms();
    this.myoDermsCopy = JSON.parse(JSON.stringify(this.myoDerms));
  },
  methods: {
    async getExistingMyoDerms() {
      this.existingMyoDerms = await this.myoDermService.getMyoDermsForReport({
        id: this.$route.params.reportId,
      });
      if (this.existingMyoDerms.length > 0) {
        this.myoDerms = this.myoDerms.map((myoDerm) => {
          const existing = this.existingMyoDerms.find(
            (el) => el.name === myoDerm.name
          );
          return existing ? { ...myoDerm, ...existing } : myoDerm;
        });
      }
    },
    backToPatient() {
      this.$router.push(`/patient/${this.$route.params.id}`);
    },
    async handleSave() {
      for (const myoDerm of this.myoDerms) {
        if (myoDerm.arom || myoDerm.pain || myoDerm.notes) {
          const matchingMyoDerm = this.existingMyoDerms.find(
            (el) => el.name === myoDerm.name
          );

          if (matchingMyoDerm) {
            await this.myoDermService.updateMyoDerm({
              id: matchingMyoDerm.id,
              ...myoDerm,
            });
          } else {
            await this.myoDermService.addMyoDerm({
              ...myoDerm,
              reportId: this.$route.params.reportId,
            });
          }
        } else {
          const myoDermToDelete = this.existingMyoDerms.find(
            (el) => el.name === myoDerm.name
          );
          if (myoDermToDelete) {
            await this.myoDermService.deleteMyoDerm({ id: myoDermToDelete.id });
          }
        }
      }
      this.myoDermsCopy = JSON.parse(JSON.stringify(this.myoDerms));
      this.editMode = false;
    },
    async handleCancel() {
      this.editMode = false;
      await this.getExistingMyoDerms();
      this.myoDermsCopy = JSON.parse(JSON.stringify(this.myoDerms));
    },
  },
};
</script>

<style scoped>
.myoDerm-table {
  border-radius: 5px;
  width: 100%;
  table-layout: fixed;
  padding: 10px;
}

.myoDerm-table th,
.myoDerm-table td {
  padding: 4px;
  text-align: left;
}

.myoDerm-table input[type='text'] {
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
