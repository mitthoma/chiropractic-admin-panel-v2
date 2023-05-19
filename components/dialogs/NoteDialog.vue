<template>
    <v-dialog max-width="1000px" @click:outside="closeDialog">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ title }}</span>
        </v-card-title>
        <v-tabs
          v-model="tab"
          color="deep-purple-accent-4"
          align-tabs="center"
        >
          <v-tab :value="1">Phase 1</v-tab>
          <v-tab :value="2">Phase 2</v-tab>
          <v-tab :value="3">Phase 3</v-tab>
          <v-tab :value="4">Phase 4</v-tab>
        </v-tabs>
        <v-window v-model="tab">
          <v-window-item
            v-for="n in 4"
            :key="n"
            :value="n"
          >
            <v-container fluid>
              <v-form ref="form" v-model="formIsValid">
                  <VueDatePicker v-model="visitDateTime" placeholder="Please select a visit date and time" dark type="datetime" :minute-interval="30" required/>
                  <v-text-field v-model="form.heightFeet" label="Height (Feet)" type="number" required></v-text-field>
                  <v-text-field v-model="form.heightInches" label="Height (Inches)" type="number" required></v-text-field>
                  <v-text-field v-model="form.pulse" label="Pulse" type="number" required></v-text-field>
                  <v-text-field v-model="form.temperature" label="Temperature" type="number" required></v-text-field>
                </v-form>
              <v-row>
                hello {{ n }}
              </v-row>
            </v-container>
          </v-window-item>
        </v-window>
        
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
        phaseOneRoomAssignment: null,
        phaseTwoRoomAssignment: null,
        phaseThreeRoomAssignment: null,
        phaseFourRoomAssignment: null,
        physio: null,
        tx: null,
        pulse: null,
        otherNotes: "",
      },
      formIsValid: false,
      visitDateTime: null,
      tab: null,
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
      this.form.phaseOneRoomAssignment = 0;
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