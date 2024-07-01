<template>
  <div>
    <v-card class="sc-card">
      <div class="card-header">
        <v-card-title>Subjective Complaints</v-card-title>
        <div class="icon-container">
          <v-icon v-if="!editMode" @click="editMode = true">mdi-pencil</v-icon>
          <div v-if="editMode">
            <v-icon @click="handleCancel">mdi-trash-can</v-icon>
            <v-icon @click="handleSave">mdi-check</v-icon>
          </div>
        </div>
      </div>
      <div>
        <div v-for="(complaint, index) in complaints" :key="index">
          <v-row class="mx-5">
            <v-col cols="3">
              <v-text-field
                v-model="complaint.text"
                label="Complaint Text"
                required
                :disabled="!editMode"
              ></v-text-field>
            </v-col>
            <v-col cols="8">
              <v-slider
                v-model="complaint.painLevel"
                :max="5"
                :step="1"
                :ticks="[0, 1, 2, 3, 4, 5]"
                show-ticks="always"
                label="Pain Level"
                :disabled="!editMode"
              ></v-slider>
            </v-col>
            <v-col cols="1" class="d-flex justify-end align-center">
              <v-icon
                v-if="editMode"
                color="red"
                @click="deleteComplaint(complaint.id)"
              >
                mdi-trash-can
              </v-icon>
            </v-col>
          </v-row>
        </div>
        <v-row class="mx-5 py-5">
          <v-btn v-if="editMode" @click="addComplaint">Add New Complaint</v-btn>
        </v-row>
      </div>
    </v-card>
  </div>
</template>

<script>
import { createComplaintService } from '~~/services/complaint';
export default {
  name: 'SubjectiveComplaints',
  data() {
    return {
      complaintService: null,
      complaints: [],
      complaintsCopy: [],
      patientId: null,
      editMode: false,
    };
  },
  async mounted() {
    this.complaintService = createComplaintService(this.$api);
    this.patientId = parseInt(this.$route.params.id);
    await this.retrieveNewComplaints();
  },
  methods: {
    addComplaint() {
      this.complaints.push({
        text: '',
        painLevel: 0,
      });
    },
    async retrieveNewComplaints() {
      this.copmlaints = [];
      this.complaintsCopy = [];
      this.complaints = await this.complaintService.getComplaintsForPatient({
        patientId: this.patientId,
      });
      this.complaintsCopy = JSON.parse(JSON.stringify(this.complaints));
    },
    async handleSave() {
      await this.handleComplaints(this.complaints);
      this.complaintsCopy = JSON.parse(JSON.stringify(this.complaints));
      this.editMode = false;
    },
    handleCancel() {
      this.complaints = JSON.parse(JSON.stringify(this.complaintsCopy));
      this.editMode = false;
    },
    async handleComplaints(complaints) {
      for (const complaint of complaints) {
        if (complaint.id) {
          await this.complaintService.updateComplaint(
            { ...complaint },
            complaint.id
          );
        } else {
          await this.complaintService.addComplaint(
            { ...complaint },
            this.patientId
          );
        }
      }

      await this.retrieveNewComplaints();
    },
    async deleteComplaint(complaintId) {
      try {
        await this.complaintService.deleteComplaint({ id: complaintId });
        this.complaints = this.complaints.filter((c) => c.id !== complaintId);
      } catch (error) {
        console.error('Failed to delete complaint:', error);
      }
    },
  },
};
</script>

<style scoped>
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
