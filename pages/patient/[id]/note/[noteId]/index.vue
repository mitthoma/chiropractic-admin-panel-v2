<template>
    <div>
      <v-container>
        <v-btn class="mb-4 mr-3" @click="backToPatient()">Back to Patient Profile</v-btn>
        <v-btn class="mb-4" color="primary" @click="editNote(currentNote)">Edit Note</v-btn>

        <v-row>
            <v-col cols="4">
                <v-card class="w-full h-full">
                    <div class="d-flex  pt-8 pb-5 px-5">
                        <v-avatar color="info" size="x-large">
                          {{currentPatient?.firstName[0]}}{{currentPatient?.lastName[0]}}
                        </v-avatar>
                    </div>
                    <v-card-title>Note Visit {{ formatDate(currentNote?.visitDate) }}</v-card-title>
                    <v-card-subtitle>For {{ currentPatient?.firstName }} {{ currentPatient?.lastName }} </v-card-subtitle>
                    <div class="px-2 py-5">
                            <div class="d-flex">
                                <v-card-title>Vitals</v-card-title>
                                <!-- <v-btn color="primary" class="justify-end">Edit General</v-btn> -->
                            </div>
                            <v-divider></v-divider>
                            <v-row>
                                <v-col class="py-5 px-2"  cols="6">
                                    <v-card-text v-if="currentNote?.heightFeet">Height: {{currentNote?.heightFeet}}' {{ currentNote?.heightInches }}"</v-card-text>
                                    <v-card-text v-else>Height: N/A</v-card-text>

                                    <v-card-text v-if="currentNote?.weight">Weight: {{ currentNote?.weight }} lbs </v-card-text>
                                    <v-card-text v-else>Weight: N/A </v-card-text>

                                    <v-card-text>Temperature: {{currentNote?.temperature }} </v-card-text>
                                </v-col>
                                <v-col class="py-5 px-2" cols="6">
                                    <v-card-text>Respiration: {{currentNote?.respiration}} </v-card-text>
                                    <v-card-text>Systolic: {{ currentNote?.systolic }} </v-card-text>
                                    <v-card-text>Diastolic: {{ currentNote?.diastolic }} </v-card-text>
                                    <v-card-text>Pulse: {{ currentNote?.pulse }} </v-card-text>

                                </v-col>
                        </v-row>
                    </div>
                </v-card>
                </v-col>
                <v-col cols="8">
                    <v-card class="elevation-4">
                        <div class="py-5 d-flex">
                        <v-card-title>Spinal Entries</v-card-title>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" class="mr-3" @click="spinalDialog = true">Add Entry</v-btn>
                        </div>
                        <EntriesTable :items="spinalEntries" @edit-item="editSpinalItem" />
                    </v-card>
                    </v-col>
        </v-row>
        <v-row>
            <v-col cols="4">
                <v-card class="w-full h-full">
                    <div class="px-5 py-5"> 
                        <div class="d-flex">
                                <v-card-title>Additional Notes</v-card-title>
                                <!-- <v-btn color="primary" class="justify-end">Edit</v-btn> -->
                            </div>
                            <v-divider></v-divider>
                            <div class="px-5 py-5">
                                <p>
                                    {{currentNote?.otherNotes}}
                                </p>
                            </div>
                    </div>
                </v-card>
            </v-col>
            
            <v-col cols="8">
      <v-card class="elevation-4">
        <div class="py-5 d-flex">
          <v-card-title>Extremity Entries</v-card-title>
          <v-spacer></v-spacer>
          <v-btn color="primary" class="mr-3" @click="extremityDialog = true">Add Entry</v-btn>
        </div>
        <EntriesTable :items="extremityEntries"  :extremity-table="true" @edit-item="editExtremityItem" />
      </v-card>
    </v-col>
        </v-row>
      </v-container>
    <SpinalDialog v-model="spinalDialog" :current-note="currentNote" :selected-item="selectedSpinalItem" @entry-added="fetchEntries" @close-dialog="closeSpinalDialog" />
    <ExtremityDialog v-model="extremityDialog" :selected-item="selectedExtremityItem" @entry-added="fetchEntries" @close-dialog="closeExtremityDialog" />
    <NoteDialog v-model="noteDialog" :selected-item="selectedNoteItem" @note-added="getCurrentNote" @close-dialog="closeNoteDialog" />
</div>  
</template>
  
<script>
import SpinalDialog from '~/components/dialogs/SpinalDialog.vue';
import ExtremityDialog from '~/components/dialogs/ExtremityDialog.vue';
import NoteDialog from '~/components/dialogs/NoteDialog.vue';
import EntriesTable from '~/components/tables/EntriesTable.vue';
import { noteStore } from '~/store/note';
import { patientStore } from '~/store/patient';
import { createEntryService } from '~/services/entry';
import { createNoteService } from '~/services/note';

export default {
    name: 'NotePage',
    components: {
        SpinalDialog,
        ExtremityDialog,
        EntriesTable,
        NoteDialog
    },
    data () {
        return {
            noteService: null,
            spinalDialog: false,
            extremityDialog: false,
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
        await this.getCurrentNote();
        this.fetchEntries();
    },
    methods: {
        editSpinalItem(item) {
            this.selectedSpinalItem = item;
            this.spinalDialog = true;
        },
        async getCurrentNote() {
            if (this.noteStore?.getCurrentNote) {
                this.currentNote = this.noteStore.getCurrentNote;
            } else {
                this.currentNote = await this.noteService?.getNote({ id: this.$route.params.noteId });
            }
        },
        editExtremityItem(item) {
            this.selectedExtremityItem = item;
            this.extremityDialog = true;
        },
        editNote(item) {
            this.selectedNoteItem = item;
            this.noteDialog = true;
        },
        closeSpinalDialog() {
            this.selectedExtremityItem = null;
            this.spinalDialog = false;
        },
        closeExtremityDialog() {
            this.selectedExtremityItem = null;
            this.extremityDialog = false;
        },
        closeNoteDialog() {
            this.selectedNoteItem = null;
            this.noteDialog = false;
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
    },
}   
</script>
  
<style>
    tbody tr {
        height: 50px;
    }
</style>
