<template>
    <v-dialog max-width="1000px" @click:outside="closeDialog">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ title }}</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="noteForm" v-model="formIsValid">
            <v-row>
                <v-col cols="12">
                    <VueDatePicker
                        v-model="visitDateTime"
                        placeholder="Please select a visit date and time"
                        dark
                        type="datetime"
                        :minute-interval="30"
                    />
                    </v-col>
            </v-row>
  
            <!-- Additional form fields based on Note entity attributes -->
            <v-row>
              <v-col cols="3">
                <v-text-field
                  v-model="form.roomAssignment"
                  label="Room Assignment"
                  type="number"
                ></v-text-field>
                
              </v-col>
              <v-col cols="3">
                <v-text-field
                  v-model="form.heightFeet"
                  label="Height (Feet)"
                  type="number"
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  v-model="form.heightInches"
                  label="Height (Inches)"
                  type="number"
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  v-model="form.respiration"
                  label="Respiration"
                  type="number"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                <v-text-field
                  v-model="form.systolic"
                  label="Systolic"
                  type="number"
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  v-model="form.pulse"
                  label="Pulse"
                  type="number"
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  v-model="form.diastolic"
                  label="Diastolic"
                  type="number"
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  v-model="form.physiotherapy"
                  label="Physiotherapy"
                  type="number"
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  v-model="form.temperature"
                  label="Temperature"
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
            <v-textarea
            v-model="form.otherNotes"
            label="Additional Notes"
            auto-grow
          ></v-textarea>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="closeDialog">Close</v-btn>
        <v-btn color="blue darken-1" text @click="submitNoteForm">{{saveButtonText}}</v-btn>
      </v-card-actions>
    </v-card>
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
        heightFeet: null,
        heightInches: null,
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
      },
      formIsValid: false,
      visitDateTime: null,
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
    closeDialog() {
      this.$emit('close-dialog');
      this.resetForm();
    },
    async populateFormData(item) {
        const visitDateTime = parseISO(item.visitDate);
        this.form = {
          ...item,
        };
        this.visitDateTime = visitDateTime;
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
      this.form.roomAssignment = 0;
      this.form.physio = 0;
      this.form.tx = 0;
      this.form.pulse = 0;
      this.form.otherNotes = "";
    },
    async submitNoteForm() {
      const patientId = this.$route.params.id;

      if (this.$refs.noteForm.validate()) {
        const formData = {
        ...this.form,
        visitDate: this.visitDateTime ? this.visitDateTime.toISOString() : null,
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
  },
};
</script>