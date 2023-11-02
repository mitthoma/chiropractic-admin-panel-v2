<template>
  <v-dialog v-model="noteDialog" class="dialog" max-width="1600px">
    <v-card>
      <v-card-title class="d-flex">
        <span class="justify-start text-h5 pa-4">{{ title }}</span>
          <v-spacer></v-spacer>
          <v-icon class="justify-end ma-4" @click="confirmExit">mdi-close</v-icon>
      </v-card-title>
      <v-tabs
        color="deep-purple-accent-4"
        align-tabs="center"
      >
        <v-tab :value="tab === 0" :disabled="tab < 0" @click="switchTab(0)">Subj. Complaints</v-tab>
        <v-tab :value="tab === 1" :disabled="tab < 1" @click="switchTab(1)">Vital Statistics</v-tab>
        <v-tab :value="tab === 2" :disabled="tab < 2" @click="switchTab(2)">Spinal Levels</v-tab>
        <v-tab :value="tab === 3" :disabled="tab < 3" @click="switchTab(3)">Extremity Levels</v-tab>
        <v-tab :value="tab === 4" :disabled="tab < 4" @click="switchTab(4)">Assessment</v-tab>
        <v-tab :value="tab === 5" :disabled="tab < 5" @click="switchTab(5)">Treatment & Plan</v-tab>

      </v-tabs>
      <v-window v-model="tab" class="phaseWindow">
        <v-window-item :value="0">
          <v-container fluid>
            <v-form ref="form0">
              <PhaseOne 
                :complaints="complaints" 
                :add-complaint="addComplaint"
                @update-complaint-text="updateComplaintText"
                @update-complaint-pain-level="updateComplaintPainLevel"
              />
            </v-form>
          </v-container>
        </v-window-item>
        <v-window-item :value="1">
          <v-container class="" fluid>
            <v-form ref="form1" @input="validateForm(1)">
              <PhaseTwo :phase-two-form="form" :selected-item="selectedItem" @update:phaseTwoForm="form = $event" @edit-visit-date-time="updateVisitDateTime" />
            </v-form>
          </v-container>
        </v-window-item>
        <v-window-item :value="2">
          <v-container class="" fluid>
            <v-form ref="form2" @input="validateForm(2)">
              <PhaseThree 
                :phase-three-form="entries" 
                :existing-data="spinalGrid" 
                @update:phaseThreeForm="entries = $event" 
                @update:spinalGrid="spinalGrid = $event" 
              />
            </v-form>
          </v-container>
        </v-window-item>
        <v-window-item :value="3">
          <v-container fluid>
            <v-form ref="form3" @input="validateForm(3)">
              <PhaseFour 
              :phase-four-form="entries" 
              :existing-data="extremityGrid"
              @update:phaseFourForm="entries = $event" 
              @update:extremityGrid="extremityGrid = $event" />
            </v-form>
          </v-container>
        </v-window-item>
        <v-window-item :value="4">
          <v-container fluid>
            <v-form ref="form4" @input="validateForm(4)">
              <PhaseFive :phase-five-form="form" @update:phaseFiveForm="form = $event" />
            </v-form>
          </v-container>
        </v-window-item>
        <v-window-item :value="5">
          <v-container fluid>
            <v-form ref="form5" @input="validateForm(5)">
              <PhaseSix :phase-six-form="form" @update:phaseSixForm="form = $event"/>
            </v-form>
          </v-container>
        </v-window-item>
      </v-window>
      <v-card-actions class="d-flex">
        <v-card-text class="justify-start">Patient: {{currentPatient?.firstName}} {{ currentPatient?.lastName }}</v-card-text>
        <v-card-text class="justify-start">Height: {{ currentPatient?.heightFeet }}' {{ currentPatient?.heightInches }}"</v-card-text>
        <v-card-text class="justify-start">Weight: {{ currentPatient?.weight }} lbs</v-card-text>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1 justify-end" text @click="confirmExit">{{ tab === 1 ? 'Back' : 'Cancel' }}</v-btn>
        <v-btn color="blue darken-1 justify-end" text @click="processPhase">{{ tab === 5 ? saveButtonText : 'Save & Next' }}</v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="exitConfirmDialog" max-width="300px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Confirmation</span>
        </v-card-title>
        <v-card-text>Are you sure you want to exit the Note Dialog?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="exitConfirmDialog = false">No</v-btn>
          <v-btn color="blue darken-1" text @click="closeDialog">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-dialog>
</template>
<script>
import { createNoteService } from '~/services/note';
import { createComplaintService } from '~/services/complaint';
import { createEntryService } from '~~/services/entry';
import { formatISO, parseISO } from 'date-fns';
import PhaseOne from './phases/PhaseOne.vue';
import PhaseTwo from './phases/PhaseTwo.vue';
import PhaseThree from './phases/PhaseThree.vue';
import PhaseFour from './phases/PhaseFour.vue';
import PhaseFive from './phases/PhaseFive.vue';
import PhaseSix from './phases/PhaseSix.vue';

export default {
  name: 'NoteDialog',
  components: {
    PhaseOne,
    PhaseTwo,
    PhaseThree,
    PhaseFour,
    PhaseFive,
    PhaseSix
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    selectedItem: {
      type: Object,
    },
    patient: {
      type: Object,
      default: null,
    }
  },
  data() {
    return {
      form: {
        visitDate: null,
        visitDateText: null,
        temperature: null,
        respiration: null,
        systolic: null,
        diastolic: null,
        physiotherapy: null,
        physio: null,
        tx: null,
        pulse: null,
        otherNotes: "",
      },
      booleanColumns: ['Sides', 'Subluxation', 'Muscle Spasm', 'Trigger Points', 'Tenderness', 'Numbness', 'Edema', 'Swelling', 'Reduced Motion'],
      spinalLevels: [
      'occ_c1',
        'c1_c2',
        'c2_c3',
        'c3_c4',
        'c4_c5',
        'c5_c6',
        'c6_c7',
        'c7_t1',
        't1_t2',
        't2_t3',
        't3_t4',
        't4_t5',
        't5_t6',
        't6_t7',
        't7_t8',
        't8_t9',
        't9_t10',
        't10_t11',
        't11_t12',
        't12_l1',
        'l1_l2',
        'l2_l3',
        'l3_l4',
        'l4_l5',
        'l5_s1',
        's1_s2',
        's2_s3',
        's3_s4',
        's4_s5',
        's5_',
      ],
      extremityLevels: ['shoulder', 'arm', 'bicep', 'tricep', 'elbow', 'wrist', 'hand', 'hip', 'thigh', 'leg', 'knee', 'calf', 'ankle', 'foot'],
      camelCaseColumns: {
        'Sides': 'sides',
        'Subluxation': 'subluxation',
        'Muscle Spasm': 'muscleSpasm',
        'Trigger Points': 'triggerPoints',
        'Tenderness': 'tenderness',
        'Numbness': 'numbness',
        'Edema': 'edema',
        'Swelling': 'swelling',
        'Reduced Motion': 'reducedMotion'
      },
      spinalGrid: [],
      extremityGrid: [],
      existingEntriesForUpdate: [],
      complaints: [
        {
          text: '',
          painLevel: 0,
        }
      ],
      formIsValid: [false, false, false, false, false, false],
      tab: 0,
      exitConfirmDialog: false,
      visitDateTime: null,
      rules: {
      requiredDate: [
        () => (this.visitDateTime || this.form.visitDateText) || 'Either Visit Date or Visit Date Text Entry is required'
      ],
    },
    };
  },
  computed: {
    noteDialog: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
    isUpdateMode() {
      return !!this.selectedItem;
    },
    title() {
      return this.isUpdateMode ? 'Update Note' : 'Add Note';
    },
    saveButtonText() {
      return this.isUpdateMode ? 'Update' : 'Save';
    },
    isFormValid() {
      if (this.$refs[`form${this.tab}`]) {
        return this.$refs[`form${this.tab}`].validate() && this.formIsValid[this.tab];
      }
      return false;
    },
    currentPatient() {
      return this.patient;
    },
  },
  watch: {
    selectedItem(newItem, oldItem) {
      if (newItem && newItem !== oldItem) {
        this.populateFormData(newItem);
        this.loadSpinalGrid(newItem.id);
        this.loadExtremityGrid(newItem.id);
      }
    },
  },
  async mounted() {
    this.noteService = createNoteService(this.$api);
    this.complaintService = createComplaintService(this.$api);
    this.entryService = createEntryService(this.$api);
    this.complaints = await this.complaintService.getComplaintsForPatient({ patientId: this.$route.params.id });
    if (this.isUpdateMode) {
      this.form = {
        ...this.selectedItem,
      };
      this.loadSpinalGrid(this.selectedItem.id);
      this.loadExtremityGrid(this.selectedItem.id);
    }
  },
  beforeUnmount() {
    this.resetForm();
  },
  methods: {
    async populateFormData(item) {
        const visitDate = parseISO(item.visitDate);
        this.form = {
          ...item,
        };
        this.visitDateTime = visitDate;
        const complaints = await this.complaintService.getComplaintsForPatient({ patientId: this.currentPatient.id });
        this.complaints = complaints.map(complaint => ({ id: complaint.id, text: complaint.text, painLevel: complaint.painLevel }));

        await this.loadSpinalGrid(item.id);
        await this.loadExtremityGrid(item.id);
        // Do similar mapping for extremityGrid
      },
      async loadSpinalGrid(noteId) {
        // Get the data from your service
        const entries = await this.entryService.getEntriesForNote({ noteId });

        // Here, you can map your entries to your spinalGrid. For example:
        const spinalLevels = [
          'occ_c1',
          'c1_c2',
          'c2_c3',
          'c3_c4',
          'c4_c5',
          'c5_c6',
          'c6_c7',
          'c7_t1',
          't1_t2',
          't2_t3',
          't3_t4',
          't4_t5',
          't5_t6',
          't6_t7',
          't7_t8',
          't8_t9',
          't9_t10',
          't10_t11',
          't11_t12',
          't12_l1',
          'l1_l2',
          'l2_l3',
          'l3_l4',
          'l4_l5',
          'l5_s1',
          's1_s2',
          's2_s3',
          's3_s4',
          's4_s5',
          's5_',
        ];

        this.spinalGrid = spinalLevels.map(level => {
          const entry = entries.find(entry => entry.spinalLevel === level);
          if (entry) {
            return entry;
          } else {
            return null;
          }
        });
      },
      async loadExtremityGrid(noteId) {
        // Get the data from your service
        const entries = await this.entryService.getEntriesForNote({ noteId });

        // Here, you can map your entries to your spinalGrid. For example:
        const extremityLevels = ['shoulder', 'arm', 'bicep', 'tricep', 'elbow', 'wrist', 'hand', 'hip', 'thigh', 'leg', 'knee', 'calf', 'ankle', 'foot'];

        this.extremityGrid = extremityLevels.map(level => {
          const entry = entries.find(entry => entry.extremityLevel === level);
          if (entry) {
            return entry;
          } else {
            return null;
          }
        });
      },
      updateComplaintText(index, newText) {
        this.complaints[index].text = newText;
      },
      updateComplaintPainLevel(index, newPainLevel) {
        this.complaints[index].painLevel = newPainLevel;
      },
      addComplaint() {
        this.complaints.push({
          text: '',
          painLevel: 0,
        });
      },
      hasAnyField(entryData, entryFields) {
          for (let field of entryFields) {
            if (entryData.hasOwnProperty(field)) {
              return true;
            }
          }
          return false;
        },
      async saveSpinalEntries(noteId) {
        const spinalLevels = [
        'occ_c1',
        'c1_c2',
        'c2_c3',
        'c3_c4',
        'c4_c5',
        'c5_c6',
        'c6_c7',
        'c7_t1',
        't1_t2',
        't2_t3',
        't3_t4',
        't4_t5',
        't5_t6',
        't6_t7',
        't7_t8',
        't8_t9',
        't9_t10',
        't10_t11',
        't11_t12',
        't12_l1',
        'l1_l2',
        'l2_l3',
        'l3_l4',
        'l4_l5',
        'l5_s1',
        's1_s2',
        's2_s3',
        's3_s4',
        's4_s5',
        's5_',
      ];
        const entryFields = ['side', 'sublux', 'muscleSpasm', 'triggerPoints', 'tenderness', 'numbness', 'edema', 'swelling', 'reducedMotion'];

        // get old entries 
        let noteEntries = await this.entryService.getEntriesForNote({ noteId });

        for(let i = 0; i < this.spinalGrid.length; i++) {
          let entryData = {
            noteId: noteId,
            spinalLevel: spinalLevels[i]
          };

          
          if (this.spinalGrid[i] && this.spinalGrid[i]?.length) {
            for(let j = 0; j < this.spinalGrid[i].length; j++) {
              if (this.spinalGrid[i][j]) {
                entryData[entryFields[j]] = this.spinalGrid[i][j];
              }
            }
          }
          

          if (this.hasAnyField(entryData, entryFields)) {
            let existingEntry = noteEntries.find(entry => entry.spinalLevel === spinalLevels[i]);

            if(existingEntry) {
              await this.entryService.updateEntry({ ...existingEntry, ...entryData });
            } else {
              await this.entryService.addEntry(entryData, noteId);
            }
          }
        }
      },
      
      async saveExtremityEntries(noteId) {
        const extremityLevels = ['shoulder', 'arm', 'bicep', 'tricep', 'elbow', 'wrist', 'hand', 'hip', 'thigh', 'leg', 'knee', 'calf', 'ankle', 'foot'];
        const entryFields = ['side', 'sublux', 'muscleSpasm', 'triggerPoints', 'tenderness', 'numbness', 'edema', 'swelling', 'reducedMotion'];
        let noteEntries = await this.entryService.getEntriesForNote({ noteId });

        for(let i = 0; i < this.extremityGrid.length; i++) {
          let entryData = {
            noteId: noteId,
            extremityLevel: extremityLevels[i]
          };

          if (this.extremityGrid[i] && this.extremityGrid[i]?.length) {
            for(let j = 0; j < this.extremityGrid[i].length; j++) {
              if (this.extremityGrid[i][j]) {
                  entryData[entryFields[j]] = this.extremityGrid[i][j];
                }
            }
          }
          

          if (this.hasAnyField(entryData, entryFields)) {
            let existingEntry = noteEntries.find(entry => entry.extremityLevel === extremityLevels[i]);

            if(existingEntry) {
              await this.entryService.updateEntry({ ...existingEntry, ...entryData });
            } else {
              await this.entryService.addEntry(entryData, noteId);
            }
          }
        }
      },
    resetForm() {
      this.tab = 0
      this.form = {
        visitDate: null,
        visitDateText: null,
        temperature: null,
        respiration: null,
        systolic: null,
        diastolic: null,
        physiotherapy: null,
        physio: null,
        tx: null,
        pulse: null,
        otherNotes: "",
      };
      this.visitDateTime = null;
      this.formIsValid = [false, false, false, false, false, false];
      this.exitConfirmDialog = false;
      this.spinalGrid = [];
      this.extremityGrid = [];
      this.complaints = [
        {
          text: '',
          painLevel: 0,
        }
      ];
    },
    async submitNoteForm() {
      const patientId = this.$route.params.id;
      const visitDateTime = new Date(this.form.visitDate);
      if (this.isFormValid) {
        const formData = {
          ...this.form,
          temperature: parseFloat(this.form.temperature),
          visitDate: visitDateTime ? formatISO(visitDateTime) : null,
        };
        const res = await this.noteService.addNote(formData, patientId);
        if (await res instanceof Error) {
        } else {
          const noteId = res.id;
          await this.saveComplaints(this.currentPatient.id);
          await this.saveSpinalEntries(noteId); 
          await this.saveExtremityEntries(noteId);
          this.$emit('note-added');
          this.closeDialog();
        }
      } else {
      }
    },
    async updateNote() {

      try {
        formattedDate = parseISO(this.form.visitDate);
      } catch (error) {
        console.error("Invalid Date:", this.form.visitDate);
      }

      const formData = {
        ...this.form,
        temperature: parseFloat(this.form.temperature),
        visitDate: this.form.visitDate ? parseISO(this.form.visitDate) : null,
      };

      // await this.saveComplaints(this.selectedItem.id);
      await this.saveSpinalEntries(this.selectedItem.id); 
      await this.saveExtremityEntries(this.selectedItem.id);

      const entries = await this.entryService.getEntriesForNote({
        noteId: this.selectedItem.id,
      });

      const updateNote = await this.noteService.updateNote({...formData, id: this.selectedItem.id});

      if (updateNote instanceof Error) {
        console.log('Note not updated');
        return;
      }

      for (let i = 0; i < this.complaints.length; i++) {
        const complaint = this.complaints[i];

        const res = complaint.id
          ? await this.complaintService.updateComplaint({ ...complaint, patientId: this.currentPatient.id}, complaint.id)
          : await this.complaintService.addComplaint({ ...complaint }, this.currentPatient.id);

        if (res instanceof Error) {
          console.log(`Complaint ${i} not updated`);
        }
      }

      // TODO: UPDATE THE ENTRIES HERE -- SHOULD BE BASED ON THE UPDATED SPINALGRID

      for (let i = 0; i < this.spinalGrid.length; i++) {
        for (let j = 0; j < entries.length; j++) {
          const updatedEntry = this.spinalGrid[i];
          const pastEntry = entries[j];
          if (updatedEntry) {
            const updateObject = {
              side: updatedEntry[0] === "" ? false : updatedEntry[0],
              sublux: updatedEntry[1] === "" ? false : updatedEntry[1],
              muscleSpasm: updatedEntry[2] === "" ? false : updatedEntry[2],
              triggerPoints: updatedEntry[3] === "" ? false : updatedEntry[3],
              tenderness: updatedEntry[4] === "" ? false : updatedEntry[4],
              numbness: updatedEntry[5] === "" ? false : updatedEntry[5],
              edema: updatedEntry[6] === "" ? false : updatedEntry[6],
              swelling: updatedEntry[7] === "" ? false : updatedEntry[7],
              reducedMotion: updatedEntry[8] === "" ? false : updatedEntry[8],
              spinalLevel: this.spinalLevels[i],
            }
            if (updateObject.spinalLevel === pastEntry.spinalLevel) {
              const updatedEntry = await this.entryService.updateEntry({
                ...pastEntry,
                ...updateObject,
              });
              if (updatedEntry instanceof Error) {
                console.log('Entry not updated');
              } 
            }
          }
          
        }
      }

      for (let i = 0; i < this.extremityGrid.length; i++) {
        for (let j = 0; j < entries.length; j++) {
          const updatedEntry = this.extremityGrid[i];
          const pastEntry = entries[j];
          if (updatedEntry) {
            const updateObject = {
              side: updatedEntry[0] === "" ? false : updatedEntry[0],
              sublux: updatedEntry[1] === "" ? false : updatedEntry[1],
              muscleSpasm: updatedEntry[2] === "" ? false : updatedEntry[2],
              triggerPoints: updatedEntry[3] === "" ? false : updatedEntry[3],
              tenderness: updatedEntry[4] === "" ? false : updatedEntry[4],
              numbness: updatedEntry[5] === "" ? false : updatedEntry[5],
              edema: updatedEntry[6] === "" ? false : updatedEntry[6],
              swelling: updatedEntry[7] === "" ? false : updatedEntry[7],
              reducedMotion: updatedEntry[8] === "" ? false : updatedEntry[8],
              extremityLevel: this.extremityLevels[i],
            }
            if (updateObject.extremityLevel === pastEntry.extremityLevel) {
              const updatedEntry = await this.entryService.updateEntry({
                ...pastEntry,
                ...updateObject,
              });
              if (updatedEntry instanceof Error) {
                console.log('Entry not updated');
              } 
            }
          }
        }
      }
      this.$emit('note-updated');
      this.closeDialog();
    },
    async switchTab(tabNumber) {
      if (await this.validateForm(this.tab)) {
        this.tab = tabNumber;
      } else {
        alert("Please fill in all required fields before switching tabs.");
      }
    },
    updateVisitDateTime(datetime) {
      const z = n => ('0' + n).slice(-2);
      const YYYY = datetime.getUTCFullYear();
      const MM = z(datetime.getUTCMonth() + 1);
      const DD = z(datetime.getUTCDate());
      const HH = z(datetime.getUTCHours());
      const mm = z(datetime.getUTCMinutes());
      const ss = z(datetime.getUTCSeconds());
      this.form.visitDate = `${YYYY}-${MM}-${DD} ${HH}:${mm}:${ss}`;
    },
    async saveComplaints(patientId) {
      for (let complaint of this.complaints) {
        if(complaint.id) {
          await this.complaintService.updateComplaint(complaint);
        } else {
          await this.complaintService.addComplaint(complaint, patientId);
        }
      }
    },
    async processPhase() {
      if (await this.validateForm(this.tab)) {
        if (this.tab === 5) {
          if (this.isUpdateMode) {
            await this.updateNote();
          } else {
            this.submitNoteForm();
          }
        } else {
            this.tab++;
        }
      }
    },
    async validateForm(tabNumber) {
      if (this.$refs[`form${tabNumber}`]) {
        const isValid = await this.$refs[`form${tabNumber}`].validate();
        this.formIsValid[tabNumber] = isValid.valid;
        return isValid.valid;
      }
      return false;
    },
    confirmExit() {
      this.exitConfirmDialog = true;
    },
    closeDialog() {
      this.$emit('close-dialog');
      this.resetForm();
    },
    
  },
};
</script>

<style scoped>
.phaseWindow {
  padding-top: 2%;
  min-height: 50vh;
}
.dialog {
  overflow: visible !important;
}

.vue-datepicker {
  position: relative;
  z-index: 9999;
}
</style>

