<template>
  <v-dialog v-model="noteDialog" class="dialog" max-width="1600px">
    <v-card>
      <v-card-title class="d-flex">
        <span class="justify-start text-h5 pa-4">{{ title }}</span>
          <v-spacer></v-spacer> <!-- Spacer to move the icon to the end of the row -->
          <v-icon class="justify-end ma-4" @click="confirmExit">mdi-close</v-icon> <!-- Close icon that calls confirmExit when clicked -->
      </v-card-title>
      <v-tabs
        color="deep-purple-accent-4"
        align-tabs="center"
      >
        <v-tab :value="tab === 0" :disabled="tab < 0" @click="switchTab(0)">Phase 1</v-tab>
        <v-tab :value="tab === 1" :disabled="tab < 1" @click="switchTab(1)">Phase 2</v-tab>
        <v-tab :value="tab === 2" :disabled="tab < 2" @click="switchTab(2)">Phase 3</v-tab>
        <v-tab :value="tab === 3" :disabled="tab < 3" @click="switchTab(3)">Phase 4</v-tab>
      </v-tabs>
      <v-window v-model="tab" class="phaseWindow">
        <v-window-item :value="0">
          <v-container fluid>
            <v-form ref="form0">
              <!-- dynamic complaints form -->
              <div v-for="(complaint, index) in complaints" :key="index">
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      v-model="complaint.text"
                      label="Complaint Text"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-slider
                      v-model="complaint.painLevel"
                      :max="5"
                      :step="1"
                      label="Pain Level"
                    ></v-slider>
                  </v-col>
                </v-row>
              </div>
              <!-- add complaint button -->
              <v-row>
                <v-btn @click="addComplaint">Add New Complaint</v-btn>
              </v-row>
            </v-form>
          </v-container>
        </v-window-item>
        <v-window-item :value="1">
          <v-container fluid>
            <v-form ref="form1" @input="validateForm(1)">
              <v-row>
                <v-col cols="6">
                  <v-text-field 
                    v-model="form.phaseTwoRoomAssignment" 
                    label="Phase 2 Room Assignment" 
                    type="number" 
                  ></v-text-field>
                </v-col>
                </v-row>
              <v-row>
                <v-col cols="6">
                  <v-text-field v-model="form.temperature" label="Temperature" type="number" required ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="form.respiration"
                    label="Respiration"
                    type="number"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="form.systolic"
                    label="Systolic"
                    type="number"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="form.pulse"
                    label="Pulse"
                    type="number"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="form.diastolic"
                    label="Diastolic"
                    type="number"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-window-item>

        <v-window-item :value="2">
          <v-container class="" fluid>
            <v-form ref="form2" @input="validateForm(2)">
              <v-row>
                <v-col cols="6">
                  <v-text-field 
                    v-model="form.phaseThreeRoomAssignment" 
                    label="Phase 3 Room Assignment" 
                    type="number" 
                  ></v-text-field>
                </v-col>
                </v-row>
                <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="form.physio"
                  label="Physio"
                  type="number"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="form.tx"
                  label="TX"
                  type="number"
                ></v-text-field>
              </v-col>
            </v-row>
            </v-form>
          </v-container>
        </v-window-item>
        <v-window-item :value="3">
          <v-container fluid>
            <v-form ref="form3" @input="validateForm(3)">
              <v-row>
                <v-col cols="6">
                  <v-text-field 
                    v-model="form.phaseFourRoomAssignment" 
                    label="Phase 4 Room Assignment" 
                    type="number" 
                  ></v-text-field>
                </v-col>
                </v-row>
              <v-row>
                <v-col cols="12">
                  <v-textarea
                    v-model="form.otherNotes"
                    label="Additional Notes"
                    auto-grow
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-window-item>
      </v-window>
      <v-card-actions class="d-flex">
        <v-card-text class="justify-start">Patient: {{currentPatient?.firstName}} {{ currentPatient?.lastName }}</v-card-text>
        <v-card-text class="justify-start">Height: {{ form.heightFeet }}' {{ form.heightInches }}"</v-card-text>
        <v-card-text class="justify-start">Weight: {{ form.weight }} lbs</v-card-text>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1 justify-end" text @click="confirmExit">Cancel</v-btn>
        <v-btn color="blue darken-1 justify-end" text @click="processPhase">{{ tab === 3 ? saveButtonText : 'Next' }}</v-btn>
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
// import VueDatePicker from '@vuepic/vue-datepicker';
import { formatISO, parseISO } from 'date-fns';
// import '@vuepic/vue-datepicker/dist/main.css';

export default {
  name: 'NoteDialog',
  components: {
    // VueDatePicker,
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
        visitDateText: null,
        heightFeet: null,
        heightInches: null,
        weight: null,
        temperature: null,
        respiration: null,
        systolic: null,
        diastolic: null,
        physiotherapy: null,
        physio: null,
        tx: null,
        pulse: null,
        otherNotes: "",
        phaseOneRoomAssignment: null,
        phaseTwoRoomAssignment: null,
        phaseThreeRoomAssignment: null,
        phaseFourRoomAssignment: null,
      },
      complaints: [
        {
          text: '',
          painLevel: 0,
        }
      ],
      formIsValid: [false, false, false, false],
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
    }
  },
  watch: {
    visitDateTime(val) {
      if (val) {
        const isoString = val.toISOString();
        this.form.visitDate = isoString.substring(0, 10);
      }
    },
    selectedItem(newItem, oldItem) {
      if (newItem && newItem !== oldItem) {
        this.populateFormData(newItem);
      }
    },
  },
  async mounted() {
    this.noteService = createNoteService(this.$api);
    this.complaintService = createComplaintService(this.$api);
    // this.complaints = await this.complaintService.getComplaintsForPatient({ patientId: this.$route.params.id });
    // console.log('complaints ', this.complaints);
  },
  methods: {
    async populateFormData(item) {
        const visitDate = parseISO(item.visitDate);
        this.form = {
          ...item,
        };
        this.visitDate = visitDate;
      },
      addComplaint() {
        this.complaints.push({
          text: '',
          painLevel: 0,
        });
      },
    resetForm() {
      this.tab = 0
      this.form = {
        visitDateText: null,
        heightFeet: null,
        heightInches: null,
        weight: null,
        temperature: null,
        respiration: null,
        systolic: null,
        diastolic: null,
        physiotherapy: null,
        physio: null,
        tx: null,
        pulse: null,
        otherNotes: "",
        phaseOneRoomAssignment: null,
        phaseTwoRoomAssignment: null,
        phaseThreeRoomAssignment: null,
        phaseFourRoomAssignment: null,
      };
      this.visitDateTime = null;
      this.formIsValid = [false, false, false, false];
      this.exitConfirmDialog = false;
    },
    async submitNoteForm() {
      const patientId = this.$route.params.id;
      if (this.isFormValid) {
        const formData = {
          ...this.form,
          visitDate: this.visitDate ? formatISO(this.visitDate) : null,
        };
        console.log('about to save and form data is ', formData, ' and patient id is ', patientId);
        const res = this.isUpdateMode
          ? await this.noteService.updateNote(formData)
          : await this.noteService.addNote(formData, patientId);
        if (await res instanceof Error) {
          console.log('Note not added');
        } else {
          console.log('response is ', res)
          const noteId = res.id;
          await this.saveComplaints(noteId);

          this.$emit('note-added');
          this.closeDialog();
        }
      } else {
      }
    },
    async switchTab(tabNumber) {
      if (await this.validateForm(this.tab)) {
        this.tab = tabNumber;
      } else {
        alert("Please fill in all required fields before switching tabs.");
      }
    },
    async saveComplaints(noteId) {
      // save complaints associated with the note ID
      // note: you would need to get note ID and also ensure this.complaints contains all complaints, not just new ones
      for (let complaint of this.complaints) {
        if(complaint.id) {
          await this.complaintService.updateComplaint(complaint);
        } else {
          console.log('complaint ', complaint);
          await this.complaintService.addComplaint(complaint, noteId);
        }
      }
    },
    async processPhase() {
      if (await this.validateForm(this.tab)) {
        if (this.tab === 3) {
          this.submitNoteForm();
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

