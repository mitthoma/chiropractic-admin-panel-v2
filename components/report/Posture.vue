<template>
  <div>
    <v-card>
      <div class="card-header">
        <v-card-title>Posture</v-card-title>
        <div class="icon-container">
          <v-icon v-if="!editMode" @click="editMode = true">mdi-pencil</v-icon>
          <div v-if="editMode">
            <v-icon @click="handleCancel">mdi-trash-can</v-icon>
            <v-icon @click="handleSave">mdi-check</v-icon>
          </div>
        </div>
      </div>
      <table class="p-3 posture-table">
        <tr>
          <th>Label</th>
          <th>WNL</th>
          <th>Tilt</th>
          <th>Tilt EST</th>
          <th>Translation</th>
          <th>Translation EST</th>
          <th>Rotation</th>
          <th>Lordosis / Kyphosis</th>
        </tr>
        <tr v-for="(posture, index) in postures" :key="index">
          <td>{{ posture.name }}</td>
          <td v-if="!editMode">{{ posture.wnl || 'None' }}</td>
          <td v-else>
            <input v-model="posture.wnl" type="text" placeholder="None" />
          </td>
          <td v-if="!editMode">{{ posture.tiltName || 'None' }}</td>
          <td v-else>
            <input v-model="posture.tiltName" type="text" placeholder="None" />
          </td>
          <td v-if="!editMode">{{ posture.tiltEst || 'None' }}</td>
          <td v-else>
            <input v-model="posture.tiltEst" type="text" placeholder="None" />
          </td>
          <td v-if="!editMode">{{ posture.translationName || 'None' }}</td>
          <td v-else>
            <input
              v-model="posture.translationName"
              type="text"
              placeholder="None"
            />
          </td>
          <td v-if="!editMode">{{ posture.translationEst || 'None' }}</td>
          <td v-else>
            <input
              v-model="posture.translationEst"
              type="text"
              placeholder="None"
            />
          </td>
          <td v-if="!editMode">{{ posture.rotation || 'None' }}</td>
          <td v-else>
            <input v-model="posture.rotation" type="text" placeholder="None" />
          </td>
          <td v-if="!editMode">{{ posture.lordKyph || 'None' }}</td>
          <td v-else>
            <input v-model="posture.lordKyph" type="text" placeholder="None" />
          </td>
        </tr>
      </table>
      <table class="p-3 posture-table">
        <tr>
          <th>Label</th>
          <th>Pronated</th>
          <th>Supinated</th>
        </tr>
        <tr v-for="(posture, index) in arches" :key="index">
          <td>{{ posture.name }}</td>
          <td v-if="!editMode">{{ posture.pronated || 'None' }}</td>
          <td v-else>
            <input v-model="posture.pronated" type="text" placeholder="None" />
          </td>
          <td v-if="!editMode">{{ posture.supinated || 'None' }}</td>
          <td v-else>
            <input v-model="posture.supinated" type="text" placeholder="None" />
          </td>
        </tr>
      </table>
    </v-card>
  </div>
</template>

<script>
import { createPostureService } from '~~/services/posture';

export default {
  name: 'PostureInput',
  components: {},
  data() {
    return {
      editMode: false,
      postureService: null,
      existingPostures: [],
      posturesCopy: null,
      postures: [
        {
          name: 'Head / Cervical',
          wnl: null,
          tiltEst: null,
          tiltName: null,
          translationName: null,
          translationEst: null,
          rotation: null,
          lordKyph: null,
        },
        {
          name: 'Shoulder / Thor',
          wnl: null,
          tiltEst: null,
          tiltName: null,
          translationName: null,
          translationEst: null,
          rotation: null,
          lordKyph: null,
        },
        {
          name: 'Pelvis / Posture',
          wnl: null,
          tiltEst: null,
          tiltName: null,
          translationName: null,
          translationEst: null,
          rotation: null,
          lordKyph: null,
        },
      ],
      arches: [
        {
          name: 'Arch',
          pronated: null,
          supinated: null,
        },
      ],
    };
  },
  async mounted() {
    this.postureService = createPostureService(this.$api);
    await this.getExistingPostures();
    this.posturesCopy = JSON.parse(JSON.stringify(this.postures));
  },
  methods: {
    async getExistingPostures() {
      this.existingPostures = await this.postureService.getPosturesForReport({
        id: this.$route.params.reportId,
      });
      if (this.existingPostures.length > 0) {
        this.postures = this.postures.map((posture) => {
          const existing = this.existingPostures.find(
            (el) => el.name === posture.name
          );
          return existing ? { ...posture, ...existing } : posture;
        });
      }
    },
    backToPatient() {
      this.$router.push(`/patient/${this.$route.params.id}`);
    },
    async handleSave() {
      for (const posture of this.postures) {
        const matchingPosture = this.existingPostures.find(
          (el) => el.name === posture.name
        );

        // Determine if there are changes
        const isChanged =
          JSON.stringify(posture) !==
          JSON.stringify(
            this.posturesCopy.find((r) => r.name === posture.name)
          );

        if (isChanged) {
          // If there's a match in existingPostures, update
          if (matchingPosture) {
            const isEmpty = [
              posture.wnl,
              posture.tiltName,
              posture.tiltEst,
              posture.translationName,
              posture.translationEst,
              posture.rotation,
              posture.lordKyph,
              posture.pronated,
              posture.supinated,
            ].every((field) => !field);
            if (isEmpty) {
              await this.postureService.deletePosture({
                id: matchingPosture.id,
              });
            } else {
              await this.postureService.updatePosture({
                id: matchingPosture.id,
                ...posture,
              });
            }
          } else {
            // If no match and there are changes, add new posture
            await this.postureService.addPosture({
              ...posture,
              reportId: this.$route.params.reportId,
            });
          }
        }
      }
      this.posturesCopy = JSON.parse(JSON.stringify(this.postures));
      this.editMode = false;
    },
    async handleCancel() {
      this.editMode = false;
      await this.getExistingPostures();
      this.posturesCopy = JSON.parse(JSON.stringify(this.postures));
    },
  },
};
</script>

<style scoped>
.posture-table {
  border-radius: 5px;
  width: 100%;
  table-layout: fixed;
  padding: 10px;
}

.posture-table th,
.posture-table td {
  padding: 4px;
  text-align: left;
}

.posture-table input[type='text'] {
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
