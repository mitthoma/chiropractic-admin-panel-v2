<template>
  <v-dialog v-model="noteDialog" max-width="1000px">
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ title }}</span>
      </v-card-title>
      <v-tabs
        color="deep-purple-accent-4"
        align-tabs="center"
      >
        <v-tab :value="tab === 0" @click="switchTab(0)">Phase 1</v-tab>
        <v-tab :value="tab === 1" @click="switchTab(1)">Phase 2</v-tab>
        <!-- <v-tab @click="switchTab(3)" :value="tab === 3">Phase 3</v-tab>
        <v-tab @click="switchTab(4)" :value="tab === 4">Phase 4</v-tab> -->
      </v-tabs>

      <v-window v-model="tab" class="phaseWindow">
        <v-window-item :value="0">
          <v-container fluid>
            <v-form ref="form1" v-model="formIsValid[0]">
              <v-row>
                <v-col cols="6">
                  <VueDatePicker v-model="form.visitDate" menu-props="auto" placeholder="Please select a visit date" class="h-full w-full overflow-visible" dark type="date" />
                </v-col>
                <v-col cols="6">
                  <v-text-field v-model="form.visitDateText" label="Visit Date Text Entry" type="string" required></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-text-field v-model="form.heightFeet" label="Height (Feet)" type="number" required @input="validateForm(0)"></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field v-model="form.heightInches" label="Height (Inches)" type="number" required></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-window-item>

        <v-window-item :value="1">
          <v-container fluid>
            <v-form ref="form2" v-model="formIsValid[1]">
              <v-row>
                <v-col cols="6">
                  <v-text-field v-model="form.temperature" label="Temperature" type="number" required></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field v-model="form.pulse" label="Pulse" type="number" required></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-window-item>

        <!-- <v-window-item :value="3">
          <v-container fluid>
            <v-form ref="form3" v-model="formIsValid[2]">
              <v-row>
                <v-col cols="6">
                  <v-text-field v-model="form.diastolic" label="Diastolic" type="number" required></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field v-model="form.systolic" label="Systolic" type="number" required></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-window-item>

        <v-window-item :value="4">
          <v-container fluid>
            <v-form ref="form4" v-model="formIsValid[3]">
              <v-row>
                <v-col cols="12">
                  <v-textarea v-model="form.otherNotes" label="Additional notes" required></v-textarea>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-window-item> -->
      </v-window>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="confirmExit">Cancel</v-btn>
        <v-btn color="blue darken-1" text @click="processPhase">{{ tab === 4 ? saveButtonText : 'Next' }}</v-btn>
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
  },
  data() {
    return {
      form: {
        visitDate: null,
        visitDateText: null,
        heightFeet: null,
        heightInches: null,
        temperature: null,
        respiration: null,
        systolic: null,
        diastolic: null,
        physiotherapy: null,
        phaseOneRoomAssignment: null,
        phaseTwoRoomAssignment: null,
        phaseThreeRoomAssignment: null,
        phaseFourRoomAssignment: null,
        physio: null,
        tx: null,
        pulse: null,
        otherNotes: "",
      },
      formIsValid: [false, false, false, false],
      tab: 0,
      exitConfirmDialog: false,
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
      console.log('in isformvalid cp and Im checking ', this.$refs[`form${this.tab + 1}`])
      console.log("this.tab is ", this.tab);
      if (this.$refs[`form${this.tab + 1}`]) {
        console.log('I AM IN THE CHECK AND I AM ABOUT TO RETURN ', this.$refs[`form${this.tab + 1}`].validate() && this.formIsValid[this.tab])
        return this.$refs[`form${this.tab + 1}`].validate() && this.formIsValid[this.tab];
      }
      console.log('In cp and I am about to return FALSE');
      return false;
    },
  },
  watch: {
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
    // switchTab(tabNumber) {
    //   console.log('this.isformvalid in switchtab', this.isFormValid, ' and tab number is ', tabNumber);
    //   if (this.isFormValid) {
    //     this.tab = tabNumber;
    //   }
    // },
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
      this.form.visitDate = null;
      this.form.heightFeet = 0;
      this.form.heightInches = 0;
      this.form.temperature = 0;
      this.form.respiration = 0;
      this.form.systolic = 0;
      this.form.diastolic = 0;
      this.form.physiotherapy = 0;
      this.form.phaseOneRoomAssignment = 0;
      this.form.physio = 0;
      this.form.tx = 0;
      this.form.pulse = 0;
      this.form.otherNotes = "";
    },
    async submitNoteForm() {
      const patientId = this.$route.params.id;

      if (this.isFormValid) {
        const formData = {
          ...this.form,
          visitDate: this.visitDate ? formatISO(this.visitDate) : null,
        };
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
    switchTab(tabNumber) {
  if (this.validateForm(this.tab)) {
    this.tab = tabNumber;
  } else {
    // Alert the user about the failed validation
    alert("Please fill in all required fields before switching tabs.");
  }
},
processPhase() {
  if (this.validateForm(this.tab)) {
    if (this.tab === 4) {
      this.submitNoteForm();
    } else {
      this.tab++;
    }
  }
},

validateForm(tabNumber) {
    this.formIsValid[tabNumber] = this.$refs[`form${tabNumber + 1}`].validate();
  },
  },
};
</script>

<style scoped>
.phaseWindow {
  min-height: 50vh;
}
</style>

