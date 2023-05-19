<template>
  <v-dialog v-model="noteDialog" class="dialog" max-width="1000px">
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
              <v-row>
                <v-col cols="6">
                  <v-text-field 
                    v-model="form.phaseOneRoomAssignment" 
                    label="Phase 1 Room Assignment" 
                    type="string" 
                  ></v-text-field>
                </v-col>
                </v-row>
                <v-row>
                <v-col cols="12">
                  <v-label>Visit Date</v-label>
                </v-col>
                <v-col cols="6">
                  <VueDatePicker
                        v-model="visitDateTime"
                        placeholder="Please select a visit date and time"
                        dark
                        type="datetime"
                        :minute-interval="30"
                        class="vue-datepicker"
                    />

                </v-col>

                <v-col cols="6">
                  <v-text-field 
                    v-model="form.visitDateText" 
                    label="Visit Date Text Entry" 
                    type="string" 
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-label>Height & Weight</v-label>
                </v-col>
                <v-col cols="4">
                  <v-text-field v-model="form.heightFeet" label="Height (Feet)" type="number" required></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field v-model="form.heightInches" label="Height (Inches)" type="number" required></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field v-model="form.weight" label="Weight" type="number" required></v-text-field>
                </v-col>
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
                    type="string" 
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
                    type="string" 
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
                    type="string" 
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
import VueDatePicker from '@vuepic/vue-datepicker';
import { formatISO, parseISO } from 'date-fns';
import '@vuepic/vue-datepicker/dist/main.css';


export default {
  name: 'NoteDialog',
  components: {
    VueDatePicker,
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
        roomAssignment: null,
        physio: null,
        tx: null,
        pulse: null,
        otherNotes: "",
        phaseOneRoomAssignment: null,
        phaseTwoRoomAssignment: null,
        phaseThreeRoomAssignment: null,
        phaseFourRoomAssignment: null,
      },
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
  },
  methods: {
    confirmExit() {
      this.exitConfirmDialog = true;
    },
    closeDialog() {
      this.$emit('close-dialog');
      this.resetForm();
    },
    async populateFormData(item) {
        const visitDate = parseISO(item.visitDate);
        this.form = {
          ...item,
        };
        this.visitDate = visitDate;
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
        roomAssignment: null,
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
        console.log('this.form is ', this.form);
        const formData = {
          ...this.form,
          visitDate: this.visitDate ? formatISO(this.visitDate) : null,
        };
        console.log('formdata is ', formData);
        console.log('visitDate is ', formData.visitDate);
        const res = this.isUpdateMode
          ? await this.noteService.updateNote(formData)
          : await this.noteService.addNote(formData, patientId);
        if (await res instanceof Error) {
          console.log('Note not added');
        } else {
          console.log('Note added successfully');
          this.$emit('note-added');
          this.closeDialog();
        }
      } else {
        console.log('Form not submitted. Did not meet validation standards.');
      }
    },
    async switchTab(tabNumber) {
      console.log('i am in switchtab and this.tab is ', this.tab);

      if (await this.validateForm(this.tab)) {
        console.log('in switch tab and tab has been validated as True');
        this.tab = tabNumber;
      } else {
        alert("Please fill in all required fields before switching tabs.");
      }
    },

    async processPhase() {
      console.log('processPhase and tab is ', this.tab);

      if (await this.validateForm(this.tab)) {
        console.log('this.validateForm(this.tab) is true)');
        if (this.tab === 3) {
          this.submitNoteForm();
        } else {
          this.tab++;
        }
      }
    },

    async validateForm(tabNumber) {
      console.log('calling validateform on form ', tabNumber);

      if (this.$refs[`form${tabNumber}`]) {
        console.log("form exists");
        console.log('for is ', this.$refs[`form${tabNumber}`]);
        const isValid = await this.$refs[`form${tabNumber}`].validate();
        console.log('we just validated and the form is ', tabNumber);
        this.formIsValid[tabNumber] = isValid.valid;
        return isValid.valid;
      }
      return false;
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

