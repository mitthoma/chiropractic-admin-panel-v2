<template>
  <v-dialog v-model="noteDialog" class="dialog" max-width="1600px">
    <v-card>
      <v-card-title class="d-flex">
        <span class="justify-start text-h5 pa-4">{{ title }}</span>
        <v-spacer></v-spacer>
        <v-icon class="justify-end ma-4" @click="confirmExit">mdi-close</v-icon>
      </v-card-title>
      <v-tabs color="deep-purple-accent-4" align-tabs="center">
        <v-tab :value="tab === 0" :disabled="tab < 0" @click="switchTab(0)"
          >Subj. Complaints</v-tab
        >
        <v-tab :value="tab === 1" :disabled="tab < 1" @click="switchTab(1)"
          >Vital Statistics</v-tab
        >
        <v-tab :value="tab === 2" :disabled="tab < 2" @click="switchTab(2)"
          >Spinal Levels</v-tab
        >
        <v-tab :value="tab === 3" :disabled="tab < 3" @click="switchTab(3)"
          >Extremity Levels</v-tab
        >
        <v-tab :value="tab === 4" :disabled="tab < 4" @click="switchTab(4)"
          >Assessment</v-tab
        >
        <v-tab :value="tab === 5" :disabled="tab < 5" @click="switchTab(5)"
          >Treatment & Plan</v-tab
        >
      </v-tabs>
      <v-window v-model="tab" class="phaseWindow">
        <v-window-item :value="0">
          <v-container fluid>
            <v-form ref="form0">
              <ComplaintPhase
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
              <VitalsPhase
                :phase-two-form="form"
                :selected-item="currentNote"
                @update:phaseTwoForm="form = $event"
                @edit-visit-date-time="updateVisitDateTime"
              />
            </v-form>
          </v-container>
        </v-window-item>
        <v-window-item :value="2">
          <v-container class="" fluid>
            <v-form ref="form2" @input="validateForm(2)">
              <SpinalFindings
                :existing-data="spinalGrid"
                @update:spinalGrid="spinalGrid = $event"
              />
              {}
            </v-form>
          </v-container>
        </v-window-item>
        <v-window-item :value="3">
          <v-container fluid>
            <v-form ref="form3" @input="validateForm(3)">
              <ExtremityFindings
                :existing-data="extremityGrid"
                @update:extremityGrid="extremityGrid = $event"
              />
            </v-form>
          </v-container>
        </v-window-item>
        <v-window-item :value="4">
          <v-container fluid>
            <v-form ref="form4" @input="validateForm(4)">
              <SpinalTreatment
                :existing-data="spinalTreatmentGrid"
                @update:spinalTreatmentGrid="spinalTreatmentGrid = $event"
              />
            </v-form>
          </v-container>
        </v-window-item>
        <v-window-item :value="5">
          <v-container fluid>
            <v-form ref="form5" @input="validateForm(5)">
              <ExtremityTreatment
                :existing-data="extremityTreatmentGrid"
                @update:extremityTreatmentGrid="extremityTreatmentGrid = $event"
              />
            </v-form>
          </v-container>
        </v-window-item>
      </v-window>
      <v-card-actions class="d-flex">
        <v-card-text class="justify-start"
          >Patient: {{ currentPatient?.firstName }}
          {{ currentPatient?.lastName }}</v-card-text
        >
        <v-card-text class="justify-start"
          >Height: {{ currentPatient?.heightFeet }}'
          {{ currentPatient?.heightInches }}"</v-card-text
        >
        <v-card-text class="justify-start"
          >Weight: {{ currentPatient?.weight }} lbs</v-card-text
        >
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1 justify-end" text @click="confirmExit">{{
          tab === 1 ? "Back" : "Cancel"
        }}</v-btn>
        <v-btn color="blue darken-1 justify-end" text @click="processPhase">{{
          tab === 5 ? saveButtonText : "Next"
        }}</v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="exitConfirmDialog" max-width="300px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Confirmation</span>
        </v-card-title>
        <v-card-text
          >Are you sure you want to exit the Note Dialog?</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="exitConfirmDialog = false"
            >No</v-btn
          >
          <v-btn color="blue darken-1" text @click="closeDialog">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-dialog>
</template>
<script>
import { createNoteService } from "~/services/note";
import { createComplaintService } from "~/services/complaint";
import { createEntryService } from "~/services/entry";
import { createTreatmentService } from "~/services/treatment";
import { createPatientService } from "~~/services/patient";
import { formatISO, parseISO } from "date-fns";
import ComplaintPhase from "./phases/ComplaintPhase.vue";
import VitalsPhase from "./phases/VitalsPhase.vue";
import SpinalFindings from "./phases/SpinalFindings.vue";
import ExtremityFindings from "./phases/ExtremityFindings.vue";
import SpinalTreatment from "./phases/SpinalTreatment.vue";
import ExtremityTreatment from "./phases/ExtremityTreatment.vue";
import { spinalLevels, extremityLevels, entryFields, treatmentFields } from "./helpers/noteArrays";

export default {
  name: "NoteDialog",
  components: {
    ComplaintPhase,
    VitalsPhase,
    SpinalFindings,
    ExtremityFindings,
    SpinalTreatment,
    ExtremityTreatment,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      oldEntries: null,
      oldTreatments: null,
      currentNote: null,
      patient: null,
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
      spinalGrid: [],
      extremityGrid: [],
      spinalTreatmentGrid: [],
      extremityTreatmentGrid: [],
      complaints: [
        {
          text: "",
          painLevel: 0,
        },
      ],
      formIsValid: [false, false, false, false, false, false],
      tab: 0,
      exitConfirmDialog: false,
      visitDateTime: null,
      rules: {
        requiredDate: [
          () =>
            this.visitDateTime ||
            this.form.visitDateText ||
            "Either Visit Date or Visit Date Text Entry is required",
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
        this.$emit("input", val);
      },
    },
    isUpdateMode() {
      return !!this.currentNote;
    },
    title() {
      return this.isUpdateMode ? "Update Note" : "Add Note";
    },
    saveButtonText() {
      return this.isUpdateMode ? "Update" : "Save";
    },
    isFormValid() {
      if (this.$refs[`form${this.tab}`]) {
        return (
          this.$refs[`form${this.tab}`].validate() && this.formIsValid[this.tab]
        );
      }
      return false;
    },
    currentPatient() {
      return this.patient;
    },
  },
  watch: {
    currentNote(newItem, oldItem) {
      if (newItem && newItem !== oldItem) {
        this.populateFormData(newItem);
        this.loadGrid(spinalLevels, 'spinal', this.oldEntries, this.oldTreatments);
        this.loadGrid(extremityLevels, 'extremity', this.oldEntries, this.oldTreatments);
      }
    },
  },
  async mounted() {
    this.noteService = createNoteService(this.$api);
    this.complaintService = createComplaintService(this.$api);
    this.entryService = createEntryService(this.$api);
    this.treatmentService = createTreatmentService(this.$api);
    this.patientService = createPatientService(this.$api);
    this.complaints = await this.complaintService.getComplaintsForPatient({
      patientId: this.$route.params.id,
    });

    if (this.$route.params.id) {
      this.patient = await this.patientService.getPatient({id: this.$route.params.id})
    }

    if (this.$route.params.noteId) {
      this.currentNote = await this.noteService.getNote({id: this.$route.params.noteId})
      if (this.isUpdateMode) {
        this.form = {
          ...this.currentNote,
        };
        await this.loadGrid(spinalLevels, 'spinal', this.oldEntries, this.oldTreatments);
        await this.loadGrid(extremityLevels, 'extremity', this.oldEntries, this.oldTreatments);
      
        //retrieve the old entries for this selected note
        const entries = await this.entryService.getEntriesForNote({
          noteId: this.currentNote.id,
        });
        if (entries) {
          this.oldEntries = entries;
        }
        const treatments = await this.treatmentService.getTreatmentsForNote({
          noteId: this.currentNote.id,
        })
        if (treatments) {
          this.oldTreatments = treatments;
        }
      }
    }
  },
  beforeUnmount() {
    this.resetForm();
  },
  methods: {
    
    //COMPLAINT METHODS
    updateComplaintText(index, newText) {
      this.complaints[index].text = newText;
    },
    updateComplaintPainLevel(index, newPainLevel) {
      this.complaints[index].painLevel = newPainLevel;
    },
    addComplaint() {
      this.complaints.push({
        text: "",
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

    async populateFormData(item) {
      const visitDate = parseISO(item.visitDate);
      this.form = {
        ...item,
      };
      this.visitDateTime = visitDate;
      const complaints = await this.complaintService.getComplaintsForPatient({
        patientId: this.currentPatient.id,
      });
      this.complaints = complaints.map((complaint) => ({
        id: complaint.id,
        text: complaint.text,
        painLevel: complaint.painLevel,
      }));

      await this.loadGrid(spinalLevels, 'spinal', this.oldEntries, this.oldTreatments);
      await this.loadGrid(extremityLevels, 'extremity', this.oldEntries, this.oldTreatments);
    },

    async loadGrid(levels, gridType, entries, treatments) {
      // Create a combined grid with both entries and treatments
      const combinedGrid = levels.map((level) => {
        let entry = null;
        let treatment = null;
        if (entries) {
          entry = entries.find(e => e.level === level && e.type === gridType && !e.isTreatment);
        }

        if (treatments) {
          treatment = treatments.find(t => t.level === level && t.type === gridType && t.isTreatment);
        }

        return {
          entry,
          treatment
        };
      });

      // Assign to appropriate data properties based on grid type
      if (gridType === 'spinal') {
        this.spinalGrid = combinedGrid.map(g => g.entry);
        this.spinalTreatmentGrid = combinedGrid.map(g => g.treatment);
      } else if (gridType === 'extremity') {
        this.extremityGrid = combinedGrid.map(g => g.entry);
        this.extremityTreatmentGrid = combinedGrid.map(g => g.treatment);
      }
    },

    async saveEntriesAndTreatments(noteId, oldEntries, grid, levels, type, isTreatment = false) {
      for (let i = 0; i < grid.length; i++) {
        let data = {
          noteId: noteId,
          level: levels[i],
          type: type,
        };
        console.log('data.noteId is ', data.noteId);
        // Populate data object
        for (let j = 0; j < grid[i].length; j++) {
          if (grid[i][j]) {
            data[isTreatment ? treatmentFields[j] : entryFields[j]] = grid[i][j];
          }
        }

        if (this.hasAnyField(data, isTreatment ? treatmentFields : entryFields)) {
          let existing = oldEntries.find(
            (entry) => entry.level === levels[i] && entry.type === type
          );

          if (existing) {
            await (isTreatment ? this.treatmentService.updateTreatment : this.entryService.updateEntry)({
              ...existing,
              ...data,
            });
          } else {
            await (isTreatment ? this.treatmentService.addTreatment : this.entryService.addEntry)(data);
          }
        }
      }
    },

    async processSaveOperations(noteId, oldEntries, patientId) {
      console.log('old entries are ', this.oldEntries);
      // Handle complaints
      await this.handleComplaints(patientId, this.complaints);

      // Save or update spinal entries and treatments
      await this.saveEntriesAndTreatments(noteId, oldEntries, this.spinalGrid, spinalLevels, "spinal");
      await this.saveEntriesAndTreatments(noteId, oldEntries, this.spinalTreatmentGrid, spinalLevels, "spinal", true);

      // Save or update extremity entries and treatments
      await this.saveEntriesAndTreatments(noteId, oldEntries, this.extremityGrid, extremityLevels, "extremity");
      await this.saveEntriesAndTreatments(noteId, oldEntries, this.extremityTreatmentGrid, extremityLevels, "extremity", true);
    },
    resetForm() {
      this.tab = 0;
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
      this.spinalTreatmentGrid = [];
      this.extremityTreatmentGrid = [];
      this.complaints = [
        {
          text: "",
          painLevel: 0,
        },
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
        if ((await res) instanceof Error) {
        } else {
          const noteId = res.id;
          await this.processSaveOperations(noteId, this.oldEntries, this.currentPatient.id);
          this.$emit("note-added");
          this.closeDialog();
        }
      } else {
      }
    },
    async updateNote() {
      //format the date
      try {
        formattedDate = parseISO(this.form.visitDate);
      } catch (error) {
        console.error("Invalid Date:", this.form.visitDate);
      }

      //update your form data based on the format
      const formData = {
        ...this.form,
        temperature: parseFloat(this.form.temperature),
        visitDate: this.form.visitDate ? parseISO(this.form.visitDate) : null,
      };

      // save the spinal and extremity entries -- SELECTED ITEM IS YOUR NOTE associated
      // I believe each of these functions populates the extremityGrid and spinalGrid as needed
      await this.processSaveOperations(this.currentNote.id, this.oldEntries, this.currentPatient.id);

      //update the note itself through the service -- this would apply to vitals
      const updateNote = await this.noteService.updateNote({
        ...formData,
        id: this.currentNote.id,
      });

      //validation check to see if it updated
      if (updateNote instanceof Error) {
        console.log("Note not updated");
        return;
      }

      await this.updateAllGridEntries(this.spinalGrid, this.extremityGrid, this.spinalTreatmentGrid, this.extremityTreatmentGrid, spinalLevels, extremityLevels, this.oldEntries);

      this.$emit("note-updated");
      this.closeDialog();
    },
    async updateAllGridEntries(spinalGrid, extremityGrid, spinalTreatmentGrid, extremityTreatmentGrid, spinalLevels, extremityLevels, entries) {
      // Combining entries and treatments for both spinal and extremity into a single array
      const combinedGrids = [
        { grid: spinalGrid, levels: spinalLevels, type: 'spinal', isTreatment: false },
        { grid: extremityGrid, levels: extremityLevels, type: 'extremity', isTreatment: false },
        { grid: spinalTreatmentGrid, levels: spinalLevels, type: 'spinal', isTreatment: true },
        { grid: extremityTreatmentGrid, levels: extremityLevels, type: 'extremity', isTreatment: true }
      ];

      // Loop through each grid and perform updates
      for (const { grid, levels, type, isTreatment } of combinedGrids) {
        for (let i = 0; i < grid.length; i++) {
          const updatedEntry = grid[i];
          if (updatedEntry) {
            const updateObject = this.mapGridToUpdateObject(updatedEntry, levels[i], type, isTreatment);
            const pastEntry = entries.find(e => e.level === levels[i] && e.type === type && e.isTreatment === isTreatment);
            if (pastEntry) {
              const service = isTreatment ? this.treatmentService : this.entryService;
              await service.updateEntry({
                ...pastEntry,
                ...updateObject,
              });
            }
          }
        }
      }
    },

    mapGridToUpdateObject(gridEntry, level, type, isTreatment) {
      const fields = isTreatment ? treatmentFields : entryFields;
      let updateObject = { level, type };

      fields.forEach((field, index) => {
        updateObject[field] = gridEntry[index] === "" ? false : gridEntry[index];
      });

      return updateObject;
    },
    async switchTab(tabNumber) {
      if (await this.validateForm(this.tab)) {
        this.tab = tabNumber;
      } else {
        alert("Please fill in all required fields before switching tabs.");
      }
    },
    updateVisitDateTime(datetime) {
      const z = (n) => ("0" + n).slice(-2);
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
        if (complaint.id) {
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
    async handleComplaints(patientId, complaints) {
      for (let complaint of complaints) {
        if (complaint.id) {
          await this.complaintService.updateComplaint({ ...complaint, patientId }, complaint.id);
        } else {
          await this.complaintService.addComplaint({ ...complaint }, patientId);
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
      this.$emit("close-dialog");
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
