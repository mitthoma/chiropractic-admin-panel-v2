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
                :selected-item="selectedItem"
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
          tab === 5 ? saveButtonText : "Save & Next"
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
    selectedItem: {
      type: Object,
    },
    patient: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      spinalGridChanged: false,
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
      return !!this.selectedItem;
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
    selectedItem(newItem, oldItem) {
      if (newItem && newItem !== oldItem) {
        this.populateFormData(newItem);
        this.loadGrid(newItem.id)
      }
    },
  },
  async mounted() {
    this.noteService = createNoteService(this.$api);
    this.complaintService = createComplaintService(this.$api);
    this.entryService = createEntryService(this.$api);
    this.treatmentService = createTreatmentService(this.$api);
    this.complaints = await this.complaintService.getComplaintsForPatient({
      patientId: this.$route.params.id,
    });
    if (this.isUpdateMode) {
      this.form = {
        ...this.selectedItem,
      };
      this.loadGrid(this.selectedItem.id);
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

      await this.loadGrid(item.id);
    },

    async loadGrid(noteId, gridType) {
      const entriesService = gridType === 'spinal' ? this.entryService : this.treatmentService;
      const entries = await this.entryService.getEntriesForNote({ noteId });
      const levels = gridType === 'spinal' ? spinalLevels : extremityLevels;
      const gridField = `${gridType}Grid`;

      this[gridField] = levels.map(level => {
        const entry = entries.find(e => e[`${gridType}Level`] === level);
        return entry || null;
      });
    },

    async saveGridEntries(noteId, gridType) {
      const levels = gridType === 'spinal' ? spinalLevels : extremityLevels;
      const gridField = `${gridType}Grid`;
      const noteEntries = await this.entryService.getEntriesForNote({ noteId });

      for (const [i, gridEntry] of this[gridField].entries()) {
        if (!gridEntry) continue;
        let entryData = { noteId, [`${gridType}Level`]: levels[i], ...gridEntry };

        let existingEntry = noteEntries.find(e => e[`${gridType}Level`] === levels[i]);
        if (existingEntry) {
          await this.entryService.updateEntry({ ...existingEntry, ...entryData });
        } else {
          await this.entryService.addEntry(entryData);
        }
      }
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
          await this.saveComplaints(this.currentPatient.id);
          await this.saveGridEntries(noteId, 'spinal');
          await this.saveGridEntries(noteId, 'extremity');
          this.$emit("note-added");
          this.closeDialog();
        }
      } else {
      }
    },

    async updateNote() {
      // Parse and validate the visit date
      try {
        this.form.visitDate = this.form.visitDate ? parseISO(this.form.visitDate) : null;
      } catch (error) {
        console.error("Invalid Date:", this.form.visitDate);
        return; // Exit if date is invalid
      }

      // Prepare the form data for submission
      const formData = {
        ...this.form,
        temperature: parseFloat(this.form.temperature),
      };

      // Update the note and handle potential errors
      const updateResult = await this.noteService.updateNote({
        ...formData,
        id: this.selectedItem.id,
      });
      if (updateResult instanceof Error) {
        console.error("Note not updated");
        return;
      }

      // Save complaint updates
      await this.saveComplaints(this.currentPatient.id);

      // Save grid entries for both spinal and extremity
      await this.saveGridEntries(this.selectedItem.id, 'spinal');
      await this.saveGridEntries(this.selectedItem.id, 'extremity');

      // Emit an event to indicate the note was updated and close the dialog
      this.$emit("note-updated");
      this.closeDialog();
    },

    async updateNote() {
      try {
        this.validateAndUpdateFormData();
        await this.performNoteUpdate();
        await this.updateComplaintsAndGrids();
        this.$emit("note-updated");
        this.closeDialog();
      } catch (error) {
        console.error("Update failed:", error);
      }
    },

    validateAndUpdateFormData() {
      // Parses date and updates form data. Throws error if invalid.
      if (!this.form.visitDate) throw new Error("Visit date is required.");

      this.form.visitDate = parseISO(this.form.visitDate);
      if (isNaN(this.form.visitDate)) throw new Error("Invalid visit date format.");

      this.form.temperature = parseFloat(this.form.temperature);
    },

    async performNoteUpdate() {
      // Submits the form data and handles the update logic.
      const formData = { ...this.form, id: this.selectedItem.id };
      const updateResult = await this.noteService.updateNote(formData);

      if (updateResult instanceof Error) {
        throw new Error("Failed to update the note.");
  }
    },

    async updateComplaintsAndGrids() {
      // Handles the updating of complaints and grids (spinal and extremity).
      await this.saveComplaints(this.currentPatient.id);
      await this.saveGridEntries(this.selectedItem.id, 'spinal');
      await this.saveGridEntries(this.selectedItem.id, 'extremity');
    },

    // New method to update treatments
    async updateTreatments(treatmentGrid, type) {
      const levels =
        type === "spinal" ? spinalLevels : extremityLevels;

      let noteTreatments = await this.treatmentService.getTreatmentsForNote({
        noteId: this.selectedItem.id,
      });

      for (let i = 0; i < treatmentGrid.length; i++) {
        let treatmentData = {
          noteId: this.selectedItem.id,
          level: levels[i],
          type: type,
        };

        treatmentFields.forEach((field, index) => {
          if (treatmentGrid[i] && treatmentGrid[i][index] != null) {
            treatmentData[field] = treatmentGrid[i][index];
          }
        });

        if (this.hasAnyField(treatmentData, treatmentFields)) {
          let existingTreatment = noteTreatments.find(
            (treatment) =>
              treatment.level === levels[i] && treatment.type === type
          );

          if (existingTreatment) {
            await this.treatmentService.updateTreatment({
              ...existingTreatment,
              ...treatmentData,
            });
          } else {
            await this.treatmentService.addTreatment(treatmentData);
          }
        }
      }
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
