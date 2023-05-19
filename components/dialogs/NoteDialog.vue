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
        <v-tab :value="tab === 0" :disabled="!formIsValid[0]" @click="switchTab(0)">Phase 1</v-tab>
        <v-tab :value="tab === 1" :disabled="!formIsValid[1]" @click="switchTab(1)">Phase 2</v-tab>
      </v-tabs>
      <v-window v-model="tab" class="phaseWindow">
        <v-window-item :value="0">
          <v-container fluid>
            <v-form ref="form0" v-model="formIsValid[0]">
              <v-row>
                <v-col cols="6">
                  <v-text-field 
                    v-model="form.visitDateText" 
                    label="Visit Date Text Entry" 
                    type="string" 
                    :rules="[value => !!value || 'Field is required']" 
                    @input="validateForm(0)"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-text-field v-model="form.heightFeet" label="Height (Feet)" type="number" required @input="validateForm(0)"></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-window-item>

        <v-window-item :value="1">
          <v-container fluid>
            <v-form ref="form1" v-model="formIsValid[1]">
              <v-row>
                <v-col cols="6">
                  <v-text-field v-model="form.temperature" label="Temperature" type="number" required @input="validateForm(1)"></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-window-item>
      </v-window>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="confirmExit">Cancel</v-btn>
        <v-btn color="blue darken-1" text @click="processPhase">{{ tab === 1 ? saveButtonText : 'Next' }}</v-btn>
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
// import VueDatePicker from '@vuepic/vue-datepicker';
import { formatISO, parseISO } from 'date-fns';


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
  },
  data() {
    return {
      form: {
        visitDateText: null,
        heightFeet: null,
        temperature: null,
      },
      formIsValid: [false, false],
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
      if (this.$refs[`form${this.tab}`]) {
        return this.$refs[`form${this.tab}`].validate() && this.formIsValid[this.tab];
      }
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
      this.form.visitDateText = null;
      this.form.heightFeet = 0;
      this.form.temperature = 0;
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
    async switchTab(tabNumber) {
      if (await this.validateForm(this.tab)) {
        this.tab = tabNumber;
      } else {
        alert("Please fill in all required fields before switching tabs.");
      }
    },

    async processPhase() {
      if (await this.validateForm(this.tab)) {
        if (this.tab === 1) {
          this.submitNoteForm();
        } else {
          this.tab++;
        }
      }
    },

    async validateForm(tabNumber) {
      console.log('IN VALIDATE FORM AND TAB IS ', tabNumber);
      console.log("formnumber is ", `form${tabNumber}` )

      if (this.$refs[`form${tabNumber}`]) {
        const isValid = await this.$refs[`form${tabNumber}`].validate();
        this.formIsValid[tabNumber] = isValid.valid;
        console.log('validation is ', isValid);
        console.log(this.formIsValid[tabNumber]);
        return isValid.valid;
      }
      return false;
    }
  },
};
</script>

<style scoped>
.phaseWindow {
  min-height: 50vh;
}
</style>

