<template>
  <v-dialog v-model="patientDialog" max-width="1000px" @click:outside="closeDialog">
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ title }}</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="patientForm" v-model="formValid">
          <v-text-field
            v-model="form.firstName"
            :rules="nameRules"
            label="First Name"
            required
          ></v-text-field>
          <v-text-field
            v-model="form.lastName"
            :rules="nameRules"
            label="Last Name"
            required
          ></v-text-field>
          <v-text-field
            v-model="form.email"
            :rules="emailRules"
            label="Email"
            required
          ></v-text-field>
          <v-text-field
            v-model="form.phoneNumber"
            :rules="phoneRules"
            label="Phone Number"
          ></v-text-field>
          <label class="form-label">Next Appointment</label>
          <VueDatePicker v-model="form.nextAppointment" dark />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="closeDialog">Close</v-btn>
        <v-btn color="blue darken-1" text @click="submitPatientForm">{{saveButtonText}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { createPatientService } from '~/services/patient';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

export default {
  name: 'PatientDialog',
  components: {
    VueDatePicker
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
      showDatePicker: false,
      form: {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        nextAppointment: null,
      },
      patientService: null,
      formValid: false,
      nameRules: [(v) => !!v || 'This field is required'],
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      phoneRules: [
        (v) => !v || /^\d{10}$/.test(v) || 'Phone number must be 10 digits',
      ],
    };
  },
  computed: {
    patientDialog: {
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
      return this.isUpdateMode ? 'Update Patient' : 'Add Patient';
    },
    saveButtonText() {
      return this.isUpdateMode ? 'Update' : 'Save';
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
    this.patientService = createPatientService(this.$api);
  },
  methods: {
    closeDialog() {
      this.$emit('close-dialog');
      this.resetForm();

    },
    populateFormData(item) {
      this.form = { ...item };
    },
    resetForm() {
      this.form.firstName = '';
      this.form.lastName = '';
      this.form.email = '';
      this.form.phoneNumber = '';
      this.form.nextAppointment = null;
    },
    async submitPatientForm() {
      if (this.$refs.patientForm.validate()) {
        const res = this.isUpdateMode
          ? await this.patientService.updatePatient(this.form)
          : await this.patientService.addPatient(this.form);
        if (await res instanceof Error) {
          console.log('Patient not added/updated');
        } else {
          console.log(
            this.isUpdateMode
              ? 'Patient updated successfully'
              : 'Patient added successfully'
          );
          this.$emit('patient-added');
          this.closeDialog();
        }
      } else {
        console.log('Form not submitted. Did not meet validation standards.');
      }
    },
  },
};
</script>