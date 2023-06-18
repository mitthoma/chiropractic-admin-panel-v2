<template>
    <v-dialog max-width="600px" @click:outside="closeDialog">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ title }}</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="complaintForm" v-model="formIsValid">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="form.text"
                  label="Complaint Text"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="form.painLevel"
                  label="Pain Level"
                  type="number"
                  :rules="[painLevelRules]"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog">Close</v-btn>
          <v-btn color="blue darken-1" text @click="submitComplaintForm">{{saveButtonText}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  import { createComplaintService } from '~/services/complaint';
  
  export default {
    name: 'PatientComplaintDialog',
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
          text: '',
          painLevel: null,
        },
        formIsValid: false,
        painLevelRules: [
            v => !v || (v >= 1 && v <= 5) || 'Pain level must be between 1 and 5',
        ],
      };
    },
    computed: {
      complaintDialog: {
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
        return this.isUpdateMode ? 'Update Complaint' : 'Add Complaint';
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
      this.complaintService = createComplaintService(this.$api);
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
        this.form.text = '';
        this.form.painLevel = null;
      },
      async submitComplaintForm() {
        const patientId = this.$route.params.id;
        if (this.$refs.complaintForm.validate()) {
            const formData = {
            ...this.form,
            };
            if (this.isUpdateMode) {
                formData.id = this.selectedItem.id;
            }
            const res = this.isUpdateMode
            ? await this.complaintService.updateComplaint(formData)
            : await this.complaintService.addComplaint(formData, patientId);
            if (res instanceof Error) {
            console.log('Complaint not updated/added');
            } else {
            this.$emit('complaint-added');
            this.closeDialog();
            }
        } else {
            console.log('Form not submitted. Did not meet validation standards.');
        }
        },
    },
    };
</script>