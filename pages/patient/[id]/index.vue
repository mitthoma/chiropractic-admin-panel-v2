<template>
  <div>
    <v-container>
      <v-btn
        variant="text"
        prepend-icon="mdi-chevron-left"
        class="mb-4 text-primary font-weight-bold"
        @click="backToPatients()"
      >
        Back to Patient List</v-btn
      >
      <v-row>
        <v-col cols="7">
          <v-card class="elevation-4 mx-5 my-5">
            <div class="py-5 d-flex">
              <v-card-title> Notes List </v-card-title>
              <v-spacer></v-spacer>
              <v-row class="mx-2 pa-2" justify="end">
                <v-btn color="primary" @click="dialog = true"
                  >Add New Note</v-btn
                >
                <NoteDialog
                  v-model="dialog"
                  :patient="currentPatient"
                  @note-added="refreshNotes"
                  @close-dialog="closeNoteDialog"
                />
              </v-row>
            </div>
            <v-table>
              <thead>
                <tr>
                  <th class="text-left">#</th>
                  <th class="text-left">Visit Date</th>
                  <th class="text-left">Last Updated</th>
                  <th class="text-right pr-8">Actions</th>
                </tr>
              </thead>
              <tbody class="">
                <tr v-for="(item, index) in shownNotes" :key="item.id">
                  <td>{{ index + 1 }}</td>
                  <td>{{ formatVisitDate(item.visitDate, item) }}</td>
                  <td>{{ formatDate(item.lastEdited, item) }}</td>
                  <td class="d-flex justify-end">
                    <v-menu transition="slide-x-transition">
                      <template #activator="{ props }">
                        <v-icon class="mt-3" v-bind="props"
                          >mdi-export-variant</v-icon
                        >
                        <!-- Update button with export icon -->
                      </template>
                      <v-list>
                        <v-list-item
                          v-for="(exportItem, i) in exportItems"
                          :key="i"
                          @click="handleExport(exportItem.type, item)"
                        >
                          <v-list-item-title>{{
                            exportItem.title
                          }}</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                    <v-icon class="ma-3" @click="goToNote(item)"
                      >mdi-eye</v-icon
                    >
                    <!-- Update button with eye icon -->
                    <v-icon class="mt-3" @click="openDeleteDialog(item)"
                      >mdi-delete</v-icon
                    >
                    <!-- Add delete button -->
                  </td>
                </tr>
              </tbody>
            </v-table>
            <v-pagination
              v-model="currentPage"
              :length="totalPages"
              :total-visible="5"
              color="primary"
            ></v-pagination>
          </v-card>
        </v-col>
        <v-col class="px-1" cols="5">
          <v-card class="mx-5 my-5 px-5 py-5">
            <div class="text-left">
              <div class="d-flex align-center mb-3">
                <v-avatar color="info" size="x-large">
                  {{ currentPatient?.firstName[0]
                  }}{{ currentPatient?.lastName[0] }}
                </v-avatar>
                <strong class="pl-3">{{
                  `${currentPatient?.firstName} ${currentPatient?.lastName}`
                }}</strong>
              </div>
              <div class="mb-2">
                <p class="text-caption font-weight-light">Account number</p>
                <p>{{ currentPatient?.acctNo }}</p>
              </div>
              <div class="mb-2">
                <p class="text-caption font-weight-light">Email</p>
                <p>{{ currentPatient?.email }}</p>
              </div>
              <div class="mb-2">
                <p class="text-caption font-weight-light">Phone number</p>
                <p>{{ formatPhoneNumber(currentPatient?.phoneNumber) }}</p>
              </div>
              <div class="d-flex mb-2">
                <div>
                  <p class="text-caption font-weight-light">Height</p>
                  <p>
                    {{ currentPatient?.heightFeet }}'
                    {{ currentPatient?.heightInches }}"
                  </p>
                </div>
                <div class="pl-5">
                  <p class="text-caption font-weight-light">Weight</p>
                  <p>{{ `${currentPatient?.weight} lbs` }}</p>
                </div>
              </div>
              <div class="d-flex justify-space-between">
                <div>
                  <p class="text-caption font-weight-light">Next appointment</p>
                  <p>
                    {{ formatNextAppointment(currentPatient?.nextAppointment) }}
                  </p>
                </div>
                <v-btn color="primary" @click="patientDialog = true"
                  >Edit Profile</v-btn
                >
              </div>
            </div>
          </v-card>

          <v-card class="elevation-4 mx-5 my-5">
            <div class="py-5 d-flex">
              <v-card-title> Reports List </v-card-title>
              <v-spacer></v-spacer>
              <!-- Additional buttons or actions for Reports can go here -->
              <v-row class="mx-2 pa-2" justify="end">
                <v-btn color="primary" @click="openNewReportDialog"
                  >Add New Report</v-btn
                >
                <v-dialog
                  v-model="reportDialog"
                  max-width="500px"
                  max-height="600px"
                >
                  <v-card class="report-dialog-card">
                    <v-card-title class="headline"
                      >Select a Report Date</v-card-title
                    >
                    <v-card-text>
                      <VueDatePicker
                        v-model="selectedDate"
                        type="date"
                        class="datepicker"
                        :enable-time-picker="false"
                      />
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="closeDialog"
                        >Cancel</v-btn
                      >
                      <v-btn
                        color="green darken-1"
                        text
                        @click="saveAndGoToReport"
                        >Save & Go To Report</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>
            </div>

            <v-table>
              <thead>
                <tr>
                  <th class="text-left">#</th>
                  <th class="text-left">Exam Date</th>
                  <th class="text-left">Date Added</th>
                  <th class="text-right pr-8">Actions</th>
                </tr>
              </thead>
              <tbody class="">
                <tr v-for="(item, index) in shownReports" :key="item.id">
                  <td>{{ index + 1 }}</td>
                  <td>{{ formatVisitDate(item.examDate, item) }}</td>
                  <td>{{ formatDate(item.dateAdded, item) }}</td>
                  <td class="d-flex justify-end">
                    <v-icon class="ma-3" @click="goToReport(item)"
                      >mdi-eye</v-icon
                    >
                    <v-icon class="mt-3" @click="openDeleteReportDialog(item)"
                      >mdi-delete</v-icon
                    >
                  </td>
                </tr>
              </tbody>
            </v-table>
            <v-pagination
              v-model="currentReportPage"
              :length="totalReportPages"
              :total-visible="5"
              color="primary"
            ></v-pagination>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog v-model="deleteDialog" max-width="500px">
      <v-card>
        <v-card-title class="headline">Delete Note</v-card-title>
        <v-card-text>
          Are you sure you want to delete this note? Deleting this note will
          delete all subjective complaint and entry data associated with it.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="deleteDialog = false"
            >Cancel</v-btn
          >
          <v-btn color="darken-1" text @click="deleteConfirmed()"
            >Delete Note</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="deleteReportDialog" max-width="500px">
      <v-card>
        <v-card-title class="headline">Delete Report</v-card-title>
        <v-card-text>
          Are you sure you want to delete this report? Deleting this report will
          delete all associated data with it.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="deleteReportDialog = false"
            >Cancel</v-btn
          >
          <v-btn color="darken-1" text @click="deleteReportConfirmed()"
            >Delete Report</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <PatientDialog
      v-model="patientDialog"
      :selected-item="currentPatient"
      @close-dialog="closePatientDialog"
      @patient-added="getCurrentPatient"
    />
  </div>
</template>

<script>
import VueDatePicker from '@vuepic/vue-datepicker';
import { patientStore } from '~/store/patient';
import { noteStore } from '~/store/note';
import { createPatientService } from '~/services/patient';
import { createNoteService } from '~/services/note';
import { createEntryService } from '~/services/entry';
import { createReportService } from '~~/services/report';
import NoteDialog from '~/components/dialogs/NoteDialog.vue';
import { generateCSV, generateXLSX } from '~/utils/csvExport';
import '@vuepic/vue-datepicker/dist/main.css';
import PatientDialog from '~~/components/dialogs/PatientDialog.vue';

export default {
  name: 'PatientPage',
  components: {
    NoteDialog,
    VueDatePicker,
    PatientDialog,
  },
  data() {
    return {
      notes: [],
      patientStore: null,
      noteStore: null,
      dialog: false,
      patientService: null,
      noteService: null,
      entryService: null,
      reportService: null,
      complaintService: null,
      payload: null,
      exportItems: [
        { title: 'Export as CSV', type: 'csv' },
        { title: 'Export as Excel', type: 'excel' },
      ],
      itemsPerPage: 6,
      currentPage: 1,
      totalPages: 1,
      displayedNotes: [],
      displayedReports: [],
      complaints: [],
      complaintDialog: false,
      complaintCurrentPage: 1,
      complaintTotalPages: 1,
      displayedComplaints: [],
      selectedComplaintItem: null,
      deleteDialog: false, // This is new, for managing the Delete Confirmation Dialog
      deleteReportDialog: false, // This is new, for managing the Delete Confirmation Dialog
      reportToDelete: null,
      noteToDelete: null, // To hold the note object to be deleted
      reports: [],
      currentReportPage: 1,
      totalReportPages: 1,
      reportHeaders: [
        { text: '#', value: 'number' },
        { text: 'Exam Date', value: 'exam_date' },
        { text: 'Date Created', value: 'dateAdded' },
      ],
      reportDialog: false,
      selectedDate: null,
      patientDialog: false,
    };
  },
  computed: {
    currentPatient() {
      const pat = this.patientStore?.getCurrentPatient;
      console.log('current patient', pat);
      return pat;
    },
    shownNotes() {
      return this.displayedNotes;
    },
    shownReports() {
      return this.displayedReports;
    },
    shownComplaints() {
      return this.displayedComplaints;
    },
  },
  watch: {
    currentPage() {
      this.updateDisplayedNotes();
    },
  },
  async mounted() {
    this.patientStore = patientStore();
    await this.getCurrentPatient();
    this.noteStore = noteStore();
    this.reportService = createReportService(this.$api);
    this.noteService = createNoteService(this.$api);
    this.entryService = createEntryService(this.$api);
    this.notes = await this.noteService.getNotesForPatient({
      patientId: this.$route.params.id,
    });
    this.updateDisplayedNotes();
    this.reports = await this.reportService.getReportsForPatient({
      patientId: this.$route.params.id,
    });
    this.updateDisplayedReports();
    console.log('reports are ', this.reports);
  },
  methods: {
    async saveAndGoToReport() {
      const report = await this.reportService.addReport(
        {
          exam_date: this.selectedDate,
        },
        this.currentPatient.id
      );
      console.log('report id is ', report);
      this.$router.push(
        `/patient/${this.$route.params.id}/report/${report.id}`
      );
      this.dialog = false;
    },
    updateDisplayedNotes() {
      if (Array.isArray(this.notes)) {
        this.notes.sort((a, b) => {
          return new Date(b.createdDate) - new Date(a.createdDate);
        });
      } else {
        console.error('notes is not an array:', this.notes);
      }
      this.notes.sort((a, b) => {
        return new Date(b.createdDate) - new Date(a.createdDate);
      });
      this.totalPages = Math.ceil(this.notes.length / this.itemsPerPage);
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      this.displayedNotes = this.notes.slice(
        startIndex,
        startIndex + this.itemsPerPage
      );
    },
    updateDisplayedReports() {
      if (Array.isArray(this.reports)) {
        this.reports.sort((a, b) => {
          return new Date(b.dateAdded) - new Date(a.dateAdded);
        });
      } else {
        console.error('reports is not an array:', this.reports);
      }
      this.reports.sort((a, b) => {
        return new Date(b.dateAdded) - new Date(a.dateAdded);
      });
      this.totalReportPages = Math.ceil(
        this.reports.length / this.itemsPerPage
      );

      const startIndex = (this.currentReportPage - 1) * this.itemsPerPage;
      this.displayedReports = this.reports.slice(
        startIndex,
        startIndex + this.itemsPerPage
      );
      console.log('displayed reports are ', this.displayedReports);
    },
    // New methods for handling delete confirmation dialog
    openDeleteDialog(note) {
      this.noteToDelete = note;
      this.deleteDialog = true;
    },
    openDeleteReportDialog(report) {
      this.reportToDelete = report;
      this.deleteReportDialog = true;
    },
    async deleteConfirmed() {
      await this.deleteNote(this.noteToDelete);
      this.deleteDialog = false;
      this.noteToDelete = null;
    },
    async deleteReportConfirmed() {
      await this.deleteReport(this.reportToDelete);
      this.deleteReportDialog = false;
      this.reportToDelete = null;
    },
    async deleteNote(item) {
      try {
        await this.noteService.deleteNote({
          noteId: item.id,
        });
        this.refreshNotes();
      } catch (error) {
        console.error('Error deleting note:', error);
      }
    },
    async deleteReport(item) {
      try {
        await this.reportService.deleteReport({
          reportId: item.id,
        });
        this.refreshReports();
      } catch (error) {
        console.error('Error deleting note:', error);
      }
    },
    async handleExport(type, item) {
      await this.assignPayload(item);
      if (type === 'csv') {
        generateCSV(this.payload);
      } else if (type === 'excel') {
        generateXLSX(this.payload);
      }
    },
    formatPhoneNumber(number) {
      if (!number) return '';
      const cleaned = ('' + number).replace(/\D/g, '');
      const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
      if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
      }
      return null;
    },
    async assignPayload(note) {
      // 1. get list of entries for note
      const entries = await this.entryService.getEntriesForNote({
        noteId: note.id,
      });

      // 2. construct the payload
      const payload = entries.reduce((acc, entry) => {
        const key = entry.spinalLevel || entry.extremityLevel;
        if (!acc[key]) {
          acc[key] = {
            sides: {},
            of: {},
            physio: {},
            treatment: {},
          };
        }

        acc[key].sides[entry.side] = true;
        acc[key].of.sublux = entry.sublux;
        acc[key].of.muscleSpasm = entry.muscleSpasm;
        acc[key].of.triggerPoints = entry.triggerPoints;
        acc[key].of.tenderness = entry.tenderness;
        acc[key].of.numbness = entry.numbness;
        acc[key].of.edema = entry.edema;
        acc[key].of.swelling = entry.swelling;
        acc[key].of.reducedMotion = entry.reducedMotion;
        acc[key].physio.positioning = entry.physioPositioning;
        acc[key].physio.coldPack = entry.coldPack;
        acc[key].physio.hotPack = entry.hotPack;
        acc[key].physio.electStim = entry.electStim;
        acc[key].physio.traction = entry.traction;
        acc[key].physio.massage = entry.massage;
        acc[key].treatment.positioning = entry.treatmentPositioning;
        acc[key].treatment.technique = entry.technique;
        acc[key].treatment.manipulation = entry.manipulation;

        return acc;
      }, {});
      payload.phaseOneRoomAssignments = {
        physio: '',
        tx: '',
      };
      const currentPatient = await this.getCurrentPatient();

      payload.patientFirstName = currentPatient.firstName;
      payload.patientLastName = currentPatient.lastName;
      payload.noteVisitDate = note.visitDate || note.visitDateText || '';
      payload.height =
        `${currentPatient.heightFeet || ''}'${
          currentPatient.heightInches || ''
        }"` || '';
      payload.weight = `${currentPatient.weight || ''} lbs`;
      payload.temperature = `${note.temperature} F` || '';
      payload.systolic = note.systolic || '';
      payload.diastoic = note.diastoic || '';
      payload.pulse = note.pulse || '';
      payload.respiration = note.respiration || '';
      payload.physiotherapyNumber = note.physiotherapy || '';

      this.payload = payload;
    },
    backToPatients() {
      this.$router.push('/patient');
    },
    goToNote(item) {
      this.noteStore.setCurrentNote(item);
      this.$router.push(`/patient/${this.$route.params.id}/note/${item.id}`);
    },
    goToReport(item) {
      this.$router.push(`/patient/${this.$route.params.id}/report/${item.id}`);
    },
    async refreshNotes() {
      this.notes = await this.noteService.getNotesForPatient({
        patientId: this.$route.params.id,
      });
      this.updateDisplayedNotes();
    },
    async refreshReports() {
      this.reports = await this.reportService.getReportsForPatient({
        patientId: this.$route.params.id,
      });
      this.updateDisplayedReports();
    },
    editComplaintItem(complaint) {
      this.complaintDialog = true;
      this.selectedComplaintItem = complaint;
    },
    closeNoteDialog() {
      this.dialog = false;
    },
    formatDate(date, item) {
      if (isNaN(Date.parse(date))) {
        return item.visitDateText || 'Invalid date';
      }

      const formattedDate = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).format(new Date(date));

      return `${formattedDate}`;
    },
    openNewReportDialog() {
      this.reportDialog = true;
    },
    closeDialog() {
      this.reportDialog = false;
    },
    closePatientDialog() {
      this.patientDialog = false;
    },
    formatVisitDate(date, item) {
      if (!date && !item.visitDateText) {
        return 'No Date Data';
      }
      if (!date || isNaN(Date.parse(date))) {
        return item.visitDateText;
      }

      const formattedDate = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).format(new Date(date));

      return `${formattedDate}`;
    },
    formatNextAppointment(date) {
      if (date) {
        const formattedDate = new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }).format(new Date(date));

        return `${formattedDate}`;
      } else {
        return 'No Appointment Scheduled';
      }
    },
    async getCurrentPatient() {
      this.patientService = createPatientService(this.$api);
      const patient = await this.patientService.getPatient({
        id: this.$route.params.id,
      });
      this.patientStore.setCurrentPatient(patient);
      return patient;
    },
    updateDisplayedComplaints() {
      // sort complaints based on lastUpdated in descending order
      this.complaints.sort((a, b) => {
        return new Date(b.lastEdited) - new Date(a.lastEdited);
      });
      this.complaintTotalPages = Math.ceil(
        this.complaints.length / this.itemsPerPage
      );
      const startIndex = (this.complaintCurrentPage - 1) * this.itemsPerPage;
      this.displayedComplaints = this.complaints.slice(
        startIndex,
        startIndex + this.itemsPerPage
      );
    },
    async refreshComplaints() {
      this.complaints = await this.complaintService.getComplaintsForPatient({
        patientId: this.$route.params.id,
      });
      this.updateDisplayedComplaints();
    },
    closeComplaintDialog() {
      this.complaintDialog = false;
    },

    formatReportDate(date) {
      if (!date || isNaN(Date.parse(date))) return 'Invalid date';
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).format(new Date(date));
    },
  },
};
</script>

<style scoped>
.info-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}
tbody tr {
  height: 50px;
}
.v-dialog {
  overflow-y: auto;
}
.report-dialog-card {
  min-height: 80vh;
}
.datepicker {
  z-index: 9999;
}
.dp__menu {
  position: inherit !important;
}
</style>
