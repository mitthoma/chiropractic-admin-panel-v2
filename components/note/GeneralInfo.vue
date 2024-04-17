<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-card>
          <div class="card-header">
            <v-card-title class="text-h5 pb-5">General Note Info</v-card-title>
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
                    <v-list-item-subtitle>{{
                      currentPatient?.firstName
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col cols="12" sm="6">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Last Name</v-list-item-title>
                    <v-list-item-subtitle>{{
                      currentPatient?.lastName
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Account Number</v-list-item-title>
                    <v-list-item-subtitle>{{
                      currentPatient?.acctNo
                    }}</v-list-item-subtitle>
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
                        v-model="form.date"
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
export default {
  name: 'GeneralInfo',
  components: {
    VueDatePicker,
  },
  props: {
    patient: {
      default: null,
      required: true,
      type: Object,
    },
    note: {
      default: null,
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      noteService: null,
      editMode: false,
      menu: false,
      form: {
        date: null,
      },
      selectedDate: new Date().toISOString().substr(0, 10),
    };
  },
  computed: {
    currentPatient() {
      return this.patient;
    },
    currentNote() {
      return this.note;
    },
  },
  async mounted() {
    // load services

    this.noteService = await createNoteService(this.$api);
  },
  methods: {
    logEvent(event) {
      console.log('Clicked inside editMode area');
      event.stopPropagation(); // Temporarily stop propagation to test
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
    },
    handleCancel() {
      this.editMode = false;
      this.selectedDate = new Date(this.currentNote?.visitDate)
        .toISOString()
        .substr(0, 10);
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
</style>
