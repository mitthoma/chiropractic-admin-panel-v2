<template>
  <div>
    <v-card>
      <div class="card-header">
        <v-card-title>Lumbar</v-card-title>
        <div class="icon-container">
          <v-icon v-if="!editMode" @click="editMode = true">mdi-pencil</v-icon>
          <div v-if="editMode">
            <v-icon @click="handleCancel">mdi-trash-can</v-icon>
            <v-icon @click="handleSave">mdi-check</v-icon>
          </div>
        </div>
      </div>
      <table class="p-3 lumbar-table">
        <tr>
          <th>Label</th>
          <th>Norm</th>
          <th>Arom</th>
          <th>Pain</th>
          <th>Notes</th>
        </tr>
        <tr v-for="(lumbar, index) in lumbars" :key="index">
          <td>{{ lumbar.name }}</td>
          <td>{{ lumbar.norm }}</td>
          <td v-if="!editMode">{{ lumbar.arom || 'None' }}</td>
          <td v-else>
            <input v-model="lumbar.arom" type="text" placeholder="None" />
          </td>
          <td v-if="!editMode">{{ lumbar.pain || 'None' }}</td>
          <td v-else>
            <input v-model="lumbar.pain" type="text" placeholder="None" />
          </td>
          <td v-if="!editMode">{{ lumbar.notes || 'None' }}</td>
          <td v-else>
            <input v-model="lumbar.notes" type="text" placeholder="None" />
          </td>
        </tr>
      </table>
    </v-card>
  </div>
</template>

<script>
import { createLumbarService } from '~~/services/lumbar';

export default {
  name: 'LumbarInput',
  components: {},
  data() {
    return {
      editMode: false,
      lumbarService: null,
      existingLumbars: [],
      lumbarsCopy: null,
      lumbars: [
        {
          name: 'Flexion',
          norm: 90,
          pain: null,
          arom: null,
          notes: null,
        },
        {
          name: 'Extension',
          norm: 30,
          pain: null,
          arom: null,
          notes: null,
        },
        {
          name: 'Lt Lat Flex',
          norm: 30,
          pain: null,
          arom: null,
          notes: null,
        },
        {
          name: 'Rt Lat Flex',
          norm: 30,
          pain: null,
          arom: null,
          notes: null,
        },
        {
          name: 'Lt Rotation',
          norm: 30,
          pain: null,
          arom: null,
          notes: null,
        },
        {
          name: 'Rt Rotation',
          norm: 30,
          pain: null,
          arom: null,
          notes: null,
        },
      ],
    };
  },
  async mounted() {
    this.lumbarService = createLumbarService(this.$api);
    await this.getExistingLumbars();
    this.lumbarsCopy = JSON.parse(JSON.stringify(this.lumbars));
  },
  methods: {
    async getExistingLumbars() {
      this.existingLumbars = await this.lumbarService.getLumbarsForReport({
        id: this.$route.params.reportId,
      });
      if (this.existingLumbars.length > 0) {
        this.lumbars = this.lumbars.map((lumbar) => {
          const existing = this.existingLumbars.find(
            (el) => el.name === lumbar.name
          );
          return existing ? { ...lumbar, ...existing } : lumbar;
        });
      }
    },
    backToPatient() {
      this.$router.push(`/patient/${this.$route.params.id}`);
    },
    async handleSave() {
      for (const lumbar of this.lumbars) {
        const matchingLumbar = this.existingLumbars.find(
          (el) => el.name === lumbar.name
        );

        const isChanged =
          JSON.stringify(lumbar) !==
          JSON.stringify(this.lumbarsCopy.find((r) => r.name === lumbar.name));

        if (isChanged) {
          if (matchingLumbar) {
            const isEmpty = [
              lumbar.norm,
              lumbar.pain,
              lumbar.arom,
              lumbar.notes,
            ].every((field) => !field);
            if (isEmpty) {
              await this.lumbarService.deleteLumbar({
                id: matchingLumbar.id,
              });
            } else {
              await this.lumbarService.updateLumbar({
                id: matchingLumbar.id,
                ...lumbar,
              });
            }
          } else {
            await this.lumbarService.addLumbar({
              ...lumbar,
              reportId: this.$route.params.reportId,
            });
          }
        }
      }
      this.editMode = false;
      await this.getExistingLumbars();
      this.lumbarsCopy = JSON.parse(JSON.stringify(this.lumbars));
    },
    async handleCancel() {
      this.editMode = false;
      await this.getExistingLumbars();
      this.lumbarsCopy = JSON.parse(JSON.stringify(this.lumbars));
    },
  },
};
</script>

<style scoped>
.lumbar-table {
  border-radius: 5px;
  width: 100%;
  table-layout: fixed;
  padding: 10px;
}

.lumbar-table th,
.lumbar-table td {
  padding: 4px;
  text-align: left;
}

.lumbar-table input[type='text'] {
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
