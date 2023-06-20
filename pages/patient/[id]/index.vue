<template>
    <div>
      <v-container>
        <v-btn class="mx-5 mb-4" @click="backToPatients()">Back to Patient List</v-btn>

        <v-row>
          <v-col cols="8">

            <v-card class="elevation-4 mx-5 my-5">
              <div class="py-5 d-flex">
                <v-card-title>
                  Notes List
                </v-card-title>
                <v-spacer></v-spacer>
                <v-row class="mx-2 pa-2" justify="end">
                    <v-btn color="primary" @click="dialog = true">Add New Note</v-btn>
                    <NoteDialog v-model="dialog"  :patient="currentPatient" @note-added="refreshNotes" @close-dialog="closeNoteDialog" />
                </v-row>
              </div>
              <v-table>
                <thead>
                  <tr >
                    <th class="text-left">
                      Visit Date
                    </th>
                    <th class="text-left">
                      Last Updated
                    </th>
                    <th class="text-right pr-8">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody class="">
                  <tr
                    v-for="(item, index) in shownNotes"
                    :key="item.id"
                  >
                    <td>{{ index + 1 }}</td>
                    <td>{{ formatVisitDate(item.visitDate, item) }}</td>
                    <td>{{ formatDate(item.lastEdited, item) }}</td>
                    <td class="d-flex justify-end">
                      <v-menu
                        transition="slide-x-transition"
                      >
                        <template #activator="{ props }">
                            <v-icon class="mt-3" v-bind="props">mdi-export-variant</v-icon> <!-- Update button with export icon -->
                        </template>

                        <v-list>
                          <v-list-item
                            v-for="(exportItem, i) in exportItems"
                            :key="i"
                            @click="handleExport(exportItem.type, item)"
                          >
                            <v-list-item-title>{{ exportItem.title }}</v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                      <v-icon class="ma-3" @click="goToNote(item)">mdi-eye</v-icon> <!-- Update button with eye icon -->
                     <v-icon class="mt-3" @click="openDeleteDialog(item)">mdi-delete</v-icon> <!-- Add delete button -->
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
          <v-col class="px-1" cols="4">
                <v-card class="px-1 mx-2 my-5">
                    <div class="d-flex align-center justify-space-around py-16">
                        <v-avatar color="info" size="x-large">
                          {{currentPatient?.firstName[0]}}{{currentPatient?.lastName[0]}}
                        </v-avatar>
                    </div>
                    <div class="d-flex align-center justify-space-around">
                      <v-col cols="12" class="text-center">
                        <v-label class="pb-0 mb-0">Account Number</v-label>
                        <v-card-text class="pt-0">{{currentPatient?.acctNo}}</v-card-text>
                      </v-col>
                    </div>
                    <div class="d-flex align-center">
                      <v-col cols="12" class="text-center pt-0 mt-0">
                        <v-label class="pb-0 mb-0">First Name</v-label>
                        <v-card-text class="pt-0">{{currentPatient?.firstName}}</v-card-text>
                      </v-col>
                    </div>
                    <div class="d-flex align-center justify-space-around">
                      <v-col cols="12" class="text-center">
                        <v-label class="pb-0 mb-0">Last Name</v-label>
                        <v-card-text class="pt-0">{{currentPatient?.lastName}}</v-card-text>
                      </v-col>
                    </div>
                    <div class="d-flex align-center justify-space-around">
                      <v-col cols="12" class="text-center">
                        <v-label class="pb-0 mb-0">Email</v-label>
                        <v-card-text class="pt-0">{{currentPatient?.email}}</v-card-text>
                      </v-col>
                    </div>
                    <div class="d-flex align-center justify-space-around">
                      <v-col cols="12" class="text-center">
                        <v-label class="pb-0 mb-0">Phone Number</v-label>
                        <v-card-text class="pt-0">{{ formatPhoneNumber(currentPatient?.phoneNumber) }}</v-card-text>
                      </v-col>
                    </div>
                </v-card>
            </v-col>
        </v-row>
      </v-container>
    </div>
    <v-dialog v-model="deleteDialog" max-width="500px">
    <v-card>
      <v-card-title class="headline">Delete Note</v-card-title>
      <v-card-text>
        Are you sure you want to delete this note? Deleting this note will delete all subjective complaint and entry data associated with it.
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" text @click="deleteDialog = false">Cancel</v-btn>
        <v-btn color="darken-1" text @click="deleteConfirmed()">Delete Note</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  </template>
  
  <script>
  import { patientStore } from '~/store/patient';
  import { noteStore } from '~/store/note';
  import { createPatientService } from '~/services/patient';
  import { createNoteService } from '~/services/note';
  import { createEntryService } from '~/services/entry';
  import {createComplaintService} from '~/services/complaint';
  import NoteDialog from '~/components/dialogs/NoteDialog.vue';
  import { generateCSV, generateXLSX } from '~/utils/csvExport';
  // import PatientComplaintDialog from '~/components/dialogs/PatientComplaintDialog.vue';

  export default {
    name: 'PatientPage',
    components: {
      NoteDialog,
      // PatientComplaintDialog
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
        complaints: [],
        complaintDialog: false,
        complaintCurrentPage: 1,
        complaintTotalPages: 1,
        displayedComplaints: [],
        selectedComplaintItem: null,
        deleteDialog: false, // This is new, for managing the Delete Confirmation Dialog
        noteToDelete: null, // To hold the note object to be deleted
      };
    },
    computed: {
      currentPatient() {
        return this.patientStore?.getCurrentPatient
      },
      shownNotes() {
        return this.displayedNotes;
      },
      shownComplaints() {
        return this.displayedComplaints;
      }
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
      this.noteService = createNoteService(this.$api);
      this.entryService = createEntryService(this.$api);
      // this.complaintService = createComplaintService(this.$api);
      this.notes = await this.noteService.getNotesForPatient({ patientId: this.$route.params.id });
      this.updateDisplayedNotes();
      // this.complaints = await this.complaintService.getComplaintsForPatient({ patientId: this.$route.params.id });
      // this.updateDisplayedComplaints();
    },
    methods: {
      updateDisplayedNotes() {
        // sort notes based on createdDate in descending order

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
        this.displayedNotes = this.notes.slice(startIndex, startIndex + this.itemsPerPage);
      },
       // New methods for handling delete confirmation dialog
      openDeleteDialog(note) {
        this.noteToDelete = note;
        this.deleteDialog = true;
      },
      async deleteConfirmed() {
        await this.deleteNote(this.noteToDelete);
        this.deleteDialog = false;
        this.noteToDelete = null;
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
          return '(' + match[1] + ') ' + match[2] + '-' + match[3]
        }
        return null;
      },
      async assignPayload(note) {
        // 1. get list of entries for note
        const entries = await this.entryService.getEntriesForNote({
          noteId: note.id,
        });

        // 2. construct the payload
        let payload = entries.reduce((acc, entry) => {
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
          acc[key].of.sublux = entry.sublux
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
          physio: "",
          tx: "",
        };
        const currentPatient = await this.getCurrentPatient();
      
        payload.patientFirstName = currentPatient.firstName;
        payload.patientLastName = currentPatient.lastName;
        payload.noteVisitDate = note.visitDate || note.visitDateText || "";
        payload.height = `${note.heightFeet || ""}'${note.heightInches || ""}"` || "";
        payload.weight = `${note.weight || ""} lbs`;
        payload.temperature = `${note.temperature} F` || "";
        payload.systolic = note.systolic || "";
        payload.diastoic = note.diastoic || "";
        payload.pulse = note.pulse || "";
        payload.respiration = note.respiration || "";
        payload.physiotherapyNumber = note.physiotherapy || ""
        payload.phaseOneRoomAssignments.physio = note.physio || "";
        payload.phaseOneRoomAssignments.tx = note.tx || "";

        this.payload = payload;
      },
      backToPatients() {
        this.$router.push('/patient');
      },
      goToNote(item) {
        this.noteStore.setCurrentNote(item);
        this.$router.push(`/patient/${this.$route.params.id}/note/${item.id}`);
      },
      async refreshNotes() {
        this.notes = await this.noteService.getNotesForPatient({ patientId: this.$route.params.id });
        this.updateDisplayedNotes();
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
                return item.visitDateText || "Invalid date";
            }

            const formattedDate = new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
            }).format(new Date(date));

            return `${formattedDate}`;
        },
        formatVisitDate(date, item) {
          if (!date && !item.visitDateText) {
              return "No Date Data";
          }
          if (!date || isNaN(Date.parse(date))) {
              return item.visitDateText;
          }

          const formattedDate = new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
          }).format(new Date(date));

          return `${formattedDate}`;
          
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
          this.complaintTotalPages = Math.ceil(this.complaints.length / this.itemsPerPage);
          const startIndex = (this.complaintCurrentPage - 1) * this.itemsPerPage;
          this.displayedComplaints = this.complaints.slice(startIndex, startIndex + this.itemsPerPage);
        },
        async refreshComplaints() {
          this.complaints = await this.complaintService.getComplaintsForPatient({ patientId: this.$route.params.id });
          this.updateDisplayedComplaints();
        },
        closeComplaintDialog() {
          this.complaintDialog = false;
        },
      },
  };
  </script>
  
<style scoped>
    tbody tr {
        height: 50px;
    }
</style>