<template>
  <div>
    <v-card>
      <div class="card-header">
        <v-card-title>Cervical</v-card-title>
        <div class="icon-container">
          <v-icon v-if="!editMode" @click="editMode = true">mdi-pencil</v-icon>
          <div v-if="editMode">
            <v-icon @click="handleCancel">mdi-trash-can</v-icon>
            <v-icon @click="handleSave">mdi-check</v-icon>
          </div>
        </div>
      </div>
      <table class="p-3 cervical-table">
        <tr>
          <th>Label</th>
          <th>Norm</th>
          <th>Arom</th>
          <th>Pain</th>
          <th>Notes</th>
        </tr>
        <tr v-for="(cervical, index) in cervicals" :key="index">
          <td>{{ cervical.name }}</td>
          <td>{{ cervical.norm }}</td>
          <td v-if="!editMode">{{ cervical.arom || 'None' }}</td>
          <td v-else>
            <input v-model="cervical.arom" type="text" placeholder="None" />
          </td>
          <td v-if="!editMode">{{ cervical.pain || 'None' }}</td>
          <td v-else>
            <input v-model="cervical.pain" type="text" placeholder="None" />
          </td>
          <td v-if="!editMode">{{ cervical.notes || 'None' }}</td>
          <td v-else>
            <input v-model="cervical.notes" type="text" placeholder="None" />
          </td>
        </tr>
      </table>
    </v-card>
  </div>
</template>

<script>
import { createCervicalService } from '~~/services/cervical';

export default {
  name: 'CervicalInput',
  components: {},
  data() {
    return {
      editMode: false,
      cervicalService: null,
      existingCervicals: [],
      cervicalsCopy: null,
      cervicals: [
        {
          name: 'Flexion',
          norm: 60,
          pain: null,
          arom: null,
          notes: null,
        },
        {
          name: 'Extension',
          norm: 75,
          pain: null,
          arom: null,
          notes: null,
        },
        {
          name: 'Lt Lat Flex',
          norm: 45,
          pain: null,
          arom: null,
          notes: null,
        },
        {
          name: 'Rt Lat Flex',
          norm: 45,
          pain: null,
          arom: null,
          notes: null,
        },
        {
          name: 'Lt Rotation',
          norm: 80,
          pain: null,
          arom: null,
          notes: null,
        },
        {
          name: 'Rt Rotation',
          norm: 80,
          pain: null,
          arom: null,
          notes: null,
        },
      ],
    };
  },
  async mounted() {
    this.cervicalService = createCervicalService(this.$api);
    await this.getExistingCervicals();
    this.cervicalsCopy = JSON.parse(JSON.stringify(this.cervicals));
  },
  methods: {
    async getExistingCervicals() {
      this.existingCervicals = await this.cervicalService.getCervicalsForReport(
        {
          id: this.$route.params.reportId,
        }
      );
      if (this.existingCervicals.length > 0) {
        this.cervicals = this.cervicals.map((cervical) => {
          const existing = this.existingCervicals.find(
            (el) => el.name === cervical.name
          );
          return existing ? { ...cervical, ...existing } : cervical;
        });
      }
    },
    backToPatient() {
      this.$router.push(`/patient/${this.$route.params.id}`);
    },
    async handleSave() {
      for (const cervical of this.cervicals) {
        if (cervical.arom || cervical.pain || cervical.notes) {
          const matchingCervical = this.existingCervicals.find(
            (el) => el.name === cervical.name
          );

          if (matchingCervical) {
            await this.cervicalService.updateCervical({
              id: matchingCervical.id,
              ...cervical,
            });
          } else {
            await this.cervicalService.addCervical({
              ...cervical,
              reportId: this.$route.params.reportId,
            });
          }
        } else {
          const cervicalToDelete = this.existingCervicals.find(
            (el) => el.name === cervical.name
          );
          if (cervicalToDelete) {
            await this.cervicalService.deleteCervical({
              id: cervicalToDelete.id,
            });
          }
        }
      }
      this.cervicalsCopy = JSON.parse(JSON.stringify(this.cervicals));
      this.editMode = false;
    },
    async handleCancel() {
      this.editMode = false;
      await this.getExistingCervicals();
      this.cervicalsCopy = JSON.parse(JSON.stringify(this.cervicals));
    },
  },
};
</script>

<style scoped>
.cervical-table {
  border-radius: 5px;
  width: 100%;
  table-layout: fixed;
  padding: 10px;
}

.cervical-table th,
.cervical-table td {
  padding: 4px;
  text-align: left;
}

.cervical-table input[type='text'] {
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
