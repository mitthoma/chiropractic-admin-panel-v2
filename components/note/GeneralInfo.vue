<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-card class="vcard" elevation="3" color="info" variant="tonal">
          <div class="card-header pa-4">
            <div class="d-flex align-center">
              <v-icon
                icon="mdi-information"
                color="info"
                size="32"
                class="mr-3"
              ></v-icon>
              <v-card-title class="text-h5 pa-0"
                >General Note Info</v-card-title
              >
            </div>
            <div class="icon-container">
              <v-icon v-if="!editMode" @click="editMode = true"
                >mdi-pencil</v-icon
              >
              <div v-if="editMode">
                <v-icon @click="handleCancel">mdi-trash-can</v-icon>
                <v-icon @click="handleSave">mdi-check</v-icon>
              </div>
            </div>
          </div>

          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>First Name</v-list-item-title>
                    <v-list-item-subtitle>{{ firstName }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col cols="12" sm="6">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Last Name</v-list-item-title>
                    <v-list-item-subtitle>{{ lastName }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Account Number</v-list-item-title>
                    <v-list-item-subtitle>{{ acctNo }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col cols="12" sm="6">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Visit Date</v-list-item-title>
                    <v-list-item-subtitle v-if="!editMode">
                      {{ formatVisitDate(currentNote?.visitDate) }}
                    </v-list-item-subtitle>
                    <div v-if="editMode">
                      <VueDatePicker
                        v-model="selectedDate"
                        type="date"
                        :enable-time-picker="false"
                      />
                    </div>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { createNoteService } from '~~/services/note';
import { createPatientService } from '~~/services/patient';
export default {
  name: 'GeneralInfo',
  components: {
    VueDatePicker,
  },
  data() {
    return {
      noteService: null,
      patientService: null,
      editMode: false,
      menu: false,
      selectedDate: null,
      firstName: null,
      lastName: null,
      acctNo: null,
    };
  },
  async mounted() {
    this.noteService = createNoteService(this.$api);
    this.patientService = createPatientService(this.$api);
    await this.retrieveData();
  },
  methods: {
    async retrieveData() {
      const { demoStore } = await import('~/store/demo');
      const demo = demoStore();

      if (demo.getIsDemo) {
        const patientId = parseInt(this.$route.params.id);
        const noteId = this.$route.params.noteId;
        this.patient = demo.getPatients.find((p) => p.id === patientId);
        this.note = demo.getNotes.find((n) => n.id === noteId);
      } else {
        this.note = await this.noteService.getNote({
          id: this.$route.params.noteId,
        });
        this.patient = await this.patientService.getPatient({
          id: this.$route.params.id,
        });
      }

      this.selectedDate =
        this.note?.visitDate || new Date().toISOString().substr(0, 10);
      this.firstName = this.patient?.firstName;
      this.lastName = this.patient?.lastName;
      this.acctNo = this.patient?.acctNo;
    },
    formatVisitDate(date) {
      return date ? new Date(date).toLocaleDateString() : 'N/A';
    },
    async handleSave() {
      const notePayload = {
        ...this.note,
        visitDate: this.selectedDate,
        id: this.note.id,
      };
      await this.noteService.updateNote(notePayload);
      this.editMode = false;
      await this.retrieveData();
    },
    async handleCancel() {
      this.editMode = false;
      this.selectedDate = new Date(this.currentNote?.visitDate)
        .toISOString()
        .substr(0, 10);
      await this.retrieveData();
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

.vcard {
  min-height: 35vh;
}
</style>
