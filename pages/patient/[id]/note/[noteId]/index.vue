<template>
    <div>
      <v-container>
        <v-btn class="mb-4 mr-3" @click="backToPatient()">Back to Patient Profile</v-btn>
        <v-btn class="mb-4" color="primary" @click="editNote(currentNote)">Edit Note</v-btn>
        <v-row>
            <v-col cols="6">
                <v-card-title>
                    General Info / Vitals
                </v-card-title>
                <v-card class="pa-5">
                    <v-row>
                            <v-col cols="6">
                                <div class="d-flex align-center justify-space-around">
                                    <v-col cols="12" class="text-center">
                                    </v-col>
                                </div>
                                <div class="d-flex align-center justify-space-around">
                                    <v-col cols="12" class="text-center">
                                        <v-label class="pb-0 mb-0">Visit Date</v-label>
                                        <!-- <v-card-text class="pt-0">{{ formatDate(currentNote?.lastEdited, currentNote) || null }}</v-card-text> -->
                                    </v-col>
                                </div>
                                <div class="d-flex align-center justify-space-around">
                                    <v-col cols="12" class="text-center">
                                        <v-label class="pb-0 mb-0">Weight</v-label>
                                        <v-card-text class="pt-0">{{currentNote?.weight}}</v-card-text>
                                    </v-col>
                                </div>
                                <div class="d-flex align-center justify-space-around">
                                    <v-col cols="12" class="text-center">
                                        <v-label class="pb-0 mb-0">Height</v-label>
                                        <v-card-text class="pt-0">{{currentNote?.heightFeet}}' {{ currentNote?.heightInches }}"</v-card-text>
                                    </v-col>
                                </div>
                                <div class="d-flex align-center justify-space-around">
                                    <v-col cols="12" class="text-center">
                                        <v-label class="pb-0 mb-0">Temperature</v-label>
                                        <v-card-text class="pt-0">{{currentNote?.temperature}}</v-card-text>
                                    </v-col>
                                </div>
                            </v-col>
                            <v-col cols="6">
                                <div class="d-flex align-center justify-space-around">
                                    <v-col cols="12" class="text-center">
                                        <v-label class="pb-0 mb-0">Systolic</v-label>
                                        <v-card-text class="pt-0">{{currentNote?.systolic}}</v-card-text>
                                    </v-col>
                                </div>
                                <div class="d-flex align-center justify-space-around">
                                    <v-col cols="12" class="text-center">
                                        <v-label class="pb-0 mb-0">Diastolic</v-label>
                                        <v-card-text class="pt-0">{{currentNote?.diastolic}}</v-card-text>
                                    </v-col>
                                </div>
                                <div class="d-flex align-center justify-space-around">
                                    <v-col cols="12" class="text-center">
                                        <v-label class="pb-0 mb-0">Respiration</v-label>
                                        <v-card-text class="pt-0">{{currentNote?.respiration}}</v-card-text>
                                    </v-col>
                                </div>
                                <div class="d-flex align-center justify-space-around">
                                    <v-col cols="12" class="text-center">
                                        <v-label class="pb-0 mb-0">Pulse</v-label>
                                        <v-card-text class="pt-0">{{currentNote?.pulse}}</v-card-text>
                                    </v-col>
                                </div>
                            </v-col>
                        </v-row>

                </v-card>
            </v-col>
            <v-col cols="12">
                <v-card-title>
                    Subjective Complaints
                </v-card-title>
                <v-card class="pa-5">
                    <v-table>
                        <thead>
                        <tr>
                            <th class="text-center" @click="sortNotes('text')">Complaint</th>
                            <th class="text-center" @click="sortNotes('painLevel')">Pain Level</th>
                            <th class="text-center" @click="sortNotes('lastEdited')">Edited Last</th>

                        </tr>
                        </thead>
                        <tbody class="">
                        <tr
                            v-for="item in complaints"
                            :key="item.id"
                        >
                            <td class="text-center">{{ item.text }}</td>
                            <td class="text-center">{{ item.text ? item.painLevel : '' }}</td>
                            <td class="text-center">{{ formatDate(item.lastEdited)}}</td>

                        </tr>
                        </tbody>
                    </v-table>
                    
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-card-title>
                    Objective Findings - Spinal
                </v-card-title>
                <v-card class="pa-5">
                    <SpinalGrid :entries="spinalEntries" />
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-card-title>
                    Objective Findings - Extremity
                </v-card-title>
                <v-card class="pa-5">
                    <ExtremityGrid :entries="extremityEntries" />
                </v-card>
            </v-col>
        </v-row>

      </v-container>
    <NoteDialog v-model="noteDialog" :selected-item="selectedNoteItem" :patient="currentPatient" @note-added="getCurrentNote" @close-dialog="closeNoteDialog" />
</div>  
</template>
  
<script>
import NoteDialog from '~/components/dialogs/NoteDialog.vue';
import { noteStore } from '~/store/note';
import { patientStore } from '~/store/patient';
import { createEntryService } from '~/services/entry';
import { createNoteService } from '~/services/note';
import { createComplaintService } from '~/services/complaint';
import SpinalGrid from '~/components/grids/SpinalGrid.vue';
import ExtremityGrid from '~/components/grids/ExtremityGrid.vue';

export default {
    name: 'NotePage',
    components: {
        NoteDialog,
        SpinalGrid,
        ExtremityGrid,
    },
    data () {
        return {
            noteService: null,
            complaintService: null,
            noteDialog: false,
            noteStore: null,
            patientStore: null,
            noteEntries: [],
            spinalEntries: [],
            extremityEntries: [],
            entryService: null,
            selectedSpinalItem: null,
            selectedExtremityItem: null,
            selectedNoteItem: null,
            currentNote: null,
            complaints: [],
            complaintsPagination: {
                page: 1,
                itemsPerPage: 8, // Number of rows per page
            }
        }
    },
    computed: {
        currentPatient() {
            return this.patientStore?.getCurrentPatient;
        }
    },
    async mounted() {
        this.noteStore = noteStore();
        this.patientStore = patientStore();
        this.entryService = createEntryService(this.$api);
        this.noteService = createNoteService(this.$api);
        this.complaintService = createComplaintService(this.$api);
        await this.getCurrentNote();
        this.fetchEntries();
        this.complaints = await this.complaintService.getComplaintsForNote({ noteId: this.currentNote.id });
    },
    methods: {
        async getCurrentNote() {
            if (this.noteStore?.getCurrentNote) {
                this.currentNote = this.noteStore.getCurrentNote;
            } else {
                this.currentNote = await this.noteService?.getNote({ id: this.$route.params.noteId });
            }
        },
        editNote(item) {
            this.selectedNoteItem = item;
            this.noteDialog = true;
        },
        async closeNoteDialog() {
            this.selectedNoteItem = null;
            this.noteDialog = false;
            this.complaints = await this.complaintService.getComplaintsForNote({ noteId: this.currentNote.id });
            await this.fetchEntries();

        },
        backToPatient() {
            this.$router.push(`/patient/${this.$route.params.id}`);
        },
        async fetchEntries() {
            if (this.currentNote) {
                this.noteEntries = await this.entryService.getEntriesForNote({ noteId: this.currentNote.id });
                this.spinalEntries = this.noteEntries.filter(entry => entry.category === 'spinal');
                this.extremityEntries = this.noteEntries.filter(entry => entry.category === 'extremity');
            } else {
                console.warn("Current note is not available.");
            }
        },
        formatDate(date) {
            if (isNaN(Date.parse(date))) {
                return "Invalid date";
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
              return "No Date Data";f
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
    },
}   
</script>
  
<style>
    tbody tr {
        height: 50px;
    }
</style>
