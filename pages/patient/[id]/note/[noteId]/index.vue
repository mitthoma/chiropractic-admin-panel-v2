<template>
  <div>
    <v-container class="custom-container">
      <v-btn class="mb-4 mr-3" @click="backToPatient()"
        >Back to Patient Profile</v-btn
      >
      <v-btn class="mb-4" color="primary" @click="editNote(currentNote)"
        >Edit Note</v-btn
      >
      <v-row>
        <v-col cols="12">
          <v-card-title> Subjective Complaints </v-card-title>
          <v-card class="pa-5">
            <v-table>
              <thead>
                <tr>
                  <th class="text-center" @click="sortNotes('text')">
                    Complaint
                  </th>
                  <th class="text-center" @click="sortNotes('painLevel')">
                    Pain Level
                  </th>
                  <th class="text-center" @click="sortNotes('lastEdited')">
                    Edited Last
                  </th>
                </tr>
              </thead>
              <tbody class="">
                <tr v-for="item in complaints" :key="item.id">
                  <td class="text-center">{{ item.text }}</td>
                  <td class="text-center">
                    {{ item.text ? item.painLevel : '' }}
                  </td>
                  <td class="text-center">{{ formatDate(item.lastEdited) }}</td>
                </tr>
              </tbody>
            </v-table>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card-title> Objective Findings - Spinal </v-card-title>
          <v-card class="pa-5 text-center">
            <SpinalGrid :entries="spinalEntries" />
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card-title> Objective Findings - Extremeties </v-card-title>
          <v-card class="pa-5">
            <ExtremityGrid :entries="extremityEntries" />
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card-title> Treatments - Spinal </v-card-title>
          <v-card class="pa-5 text-center">
            <SpinalTreatmentGrid :treatments="spinalTreatments" />
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card-title> Treatments - Extremity </v-card-title>
          <v-card class="pa-5 text-center">
            <ExtremityTreatmentGrid :treatments="extremityTreatments" />
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card-title> General Info / Vitals </v-card-title>
          <v-card class="pa-5">
            <v-row>
              <v-col cols="6">
                <div class="d-flex align-center justify-space-around">
                  <v-col cols="12" class="text-center">
                    <v-label class="pb-0 mb-0">Visit Date</v-label>
                    <v-card-text class="pt-0">{{
                      formatDate(activeNote?.visitDate, activeNote) || null
                    }}</v-card-text>
                  </v-col>
                </div>
                <div class="d-flex align-center justify-space-around">
                  <v-col cols="12" class="text-center">
                    <v-label class="pb-0 mb-0">Weight</v-label>
                    <v-card-text v-if="currentPatient?.weight" class="pt-0">{{
                      currentPatient?.weight
                    }}</v-card-text>
                  </v-col>
                </div>
                <div class="d-flex align-center justify-space-around">
                  <v-col cols="12" class="text-center">
                    <v-label class="pb-0 mb-0">Height</v-label>
                    <v-card-text v-if="currentPatient?.heightFeet" class="pt-0"
                      >{{ currentPatient?.heightFeet }}'
                      {{ currentPatient?.heightInches }}"</v-card-text
                    >
                  </v-col>
                </div>
                <div class="d-flex align-center justify-space-around">
                  <v-col cols="12" class="text-center">
                    <v-label class="pb-0 mb-0">Temperature</v-label>
                    <v-card-text v-if="activeNote?.temperature" class="pt-0">{{
                      activeNote?.temperature
                    }}</v-card-text>
                  </v-col>
                </div>
              </v-col>
              <v-col cols="6">
                <div class="d-flex align-center justify-space-around">
                  <v-col cols="12" class="text-center">
                    <v-label class="pb-0 mb-0">Systolic</v-label>
                    <v-card-text v-if="activeNote?.systolic" class="pt-0">{{
                      activeNote?.systolic
                    }}</v-card-text>
                  </v-col>
                </div>
                <div class="d-flex align-center justify-space-around">
                  <v-col cols="12" class="text-center">
                    <v-label class="pb-0 mb-0">Diastolic</v-label>
                    <v-card-text v-if="activeNote?.diastolic" class="pt-0">{{
                      activeNote?.diastolic
                    }}</v-card-text>
                  </v-col>
                </div>
                <div class="d-flex align-center justify-space-around">
                  <v-col cols="12" class="text-center">
                    <v-label class="pb-0 mb-0">Respiration</v-label>
                    <v-card-text v-if="activeNote?.respiration" class="pt-0">{{
                      activeNote?.respiration
                    }}</v-card-text>
                  </v-col>
                </div>
                <div class="d-flex align-center justify-space-around">
                  <v-col cols="12" class="text-center">
                    <v-label class="pb-0 mb-0">Pulse</v-label>
                    <v-card-text v-if="activeNote?.pulse" class="pt-0">{{
                      activeNote?.pulse
                    }}</v-card-text>
                  </v-col>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <NoteDialog
      v-model="noteDialog"
      :selected-item="selectedNoteItem"
      :patient="currentPatient"
      @note-added="getCurrentNote"
      @note-updated="getCurrentNote"
      @close-dialog="closeNoteDialog"
    />
  </div>
</template>

<script>
import NoteDialog from '~/components/dialogs/NoteDialog.vue';
import { noteStore } from '~/store/note';
import { patientStore } from '~/store/patient';
import { createEntryService } from '~/services/entry';
import { createNoteService } from '~/services/note';
import { createComplaintService } from '~/services/complaint';
import { createTreatmentService } from '~~/services/treatment';
import { createPatientService } from '~~/services/patient';
import SpinalGrid from '~/components/grids/SpinalGrid.vue';
import ExtremityGrid from '~/components/grids/ExtremityGrid.vue';
import SpinalTreatmentGrid from '~~/components/grids/SpinalTreatmentGrid.vue';
import ExtremityTreatmentGrid from '~~/components/grids/ExtremityTreatmentGrid.vue';

export default {
  name: 'NotePage',
  components: {
    NoteDialog,
    SpinalGrid,
    ExtremityGrid,
    SpinalTreatmentGrid,
    ExtremityTreatmentGrid,
  },
  data() {
    return {
      noteService: null,
      complaintService: null,
      patientService: null,
      treatmentService: null,
      noteDialog: false,
      noteStore: null,
      patientStore: null,
      noteEntries: [],
      noteTreatments: [],
      spinalEntries: [],
      extremityEntries: [],
      spinalTreatments: [],
      extremityTreatments: [],
      entryService: null,
      selectedSpinalItem: null,
      selectedExtremityItem: null,
      selectedNoteItem: null,
      currentNote: null,
      complaints: [],
      currentPatient: null,
      complaintsPagination: {
        page: 1,
        itemsPerPage: 8, // Number of rows per page
      },
    };
  },
  computed: {
    activeNote() {
      return this.currentNote;
    },
  },
  async mounted() {
    this.noteStore = noteStore();
    this.patientStore = patientStore();
    this.entryService = createEntryService(this.$api);
    this.noteService = createNoteService(this.$api);
    this.complaintService = createComplaintService(this.$api);
    this.patientService = createPatientService(this.$api);
    this.treatmentService = createTreatmentService(this.$api);
    // assign patient to a currentpatient variable from using the getPatient service function from id after /patient/{id} in the url
    const patientId = this.$route.params.id;
    this.currentPatient = await this.patientService.getPatient({
      id: patientId,
    });
    await this.getCurrentNote();
    this.fetchEntries();
    this.complaints = await this.complaintService.getComplaintsForPatient({
      patientId,
    });
  },
  methods: {
    async getCurrentNote() {
      this.currentNote = await this.noteService?.getNote({
        id: this.$route.params.noteId,
      });
    },
    editNote(item) {
      this.selectedNoteItem = item;
      this.noteDialog = true;
    },
    async closeNoteDialog() {
      this.selectedNoteItem = null;
      this.noteDialog = false;
      this.complaints = await this.complaintService.getComplaintsForPatient({
        patientId: this.currentPatient?.id,
      });
      await this.fetchEntries();
    },
    backToPatient() {
      this.$router.push(`/patient/${this.$route.params.id}`);
    },
    async fetchEntries() {
      if (this.currentNote) {
        this.noteEntries = await this.entryService.getEntriesForNote({
          noteId: this.currentNote?.id,
        });
        this.noteTreatments = await this.treatmentService.getTreatmentsForNote({
          noteId: this.currentNote?.id,
        });
        this.spinalTreatments = this.noteTreatments.filter(
          (treatment) => treatment.category === 'spinal'
        );
        this.extremityTreatments = this.noteTreatments.filter(
          (treatment) => treatment.category === 'extremity'
        );
        this.spinalEntries = this.noteEntries.filter(
          (entry) => entry.category === 'spinal'
        );
        this.extremityEntries = this.noteEntries.filter(
          (entry) => entry.category === 'extremity'
        );
      } else {
        console.warn('Current note is not available.');
      }
    },
    formatDate(date) {
      if (isNaN(Date.parse(date))) {
        return 'Invalid date';
      }

      const formattedDate = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).format(new Date(date));

      return `${formattedDate}`;
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
  },
};
</script>

<style>
tbody tr {
  height: 50px;
}

.custom-container {
  max-width: 100% !important;
}
</style>
