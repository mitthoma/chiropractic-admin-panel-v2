<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-card>
          <div class="card-header">
            <v-card-title class="text-h5 pb-5"
              >General Exam Summary Info</v-card-title
            >
            <div class="icon-container">
              <v-icon v-if="!editMode" @click="editMode = true"
                >mdi-pencil</v-icon
              >
              <div v-if="editMode">
                <v-icon @click="handleCancel">mdi-trash-can</v-icon>
                <v-icon @click="handleSave">mdi-check</v-icon>
              </div>
            </div>
          </div>

          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>First Name</v-list-item-title>
                    <v-list-item-subtitle>{{
                      currentPatient?.firstName
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col cols="12" sm="6">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Last Name</v-list-item-title>
                    <v-list-item-subtitle>{{
                      currentPatient?.lastName
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Account Number</v-list-item-title>
                    <v-list-item-subtitle>{{
                      currentPatient?.acctNo
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col cols="12" sm="6">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Exam Date</v-list-item-title>
                    <v-list-item-subtitle v-if="!editMode">
                      {{ formatExamDate(currentReport?.exam_date) }}
                    </v-list-item-subtitle>
                    <div v-if="editMode">
                      <v-text-field
                        v-model="selectedDate"
                        label="Pick a date"
                        prepend-icon="mdi-calendar"
                        readonly
                      ></v-text-field>
                      <VueDatePicker
                        v-model="selectedDate"
                        type="date"
                        :enable-time-picker="false"
                      />
                    </div>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { createReportService } from '~~/services/report';
export default {
  name: 'GeneralInfo',
  components: {
    VueDatePicker,
  },
  props: {
    patient: {
      default: null,
      required: true,
      type: Object,
    },
    report: {
      default: null,
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      reportService: null,
      editMode: false,
      menu: false,
      selectedDate: new Date().toISOString().substr(0, 10),
    };
  },
  computed: {
    currentPatient() {
      return this.patient;
    },
    currentReport() {
      return this.report;
    },
  },
  async mounted() {
    // load services

    this.reportService = await createReportService(this.$api);
  },
  methods: {
    formatExamDate(date) {
      return date ? new Date(date).toLocaleDateString() : 'N/A';
    },
    formatHeight(feet, inches) {
      return `${feet}' ${inches}"` || 'N/A';
    },
    async handleSave() {
      const payload = {
        exam_date: this.selectedDate,
      };
      await this.reportService.updateReport(this.currentReport.id, payload);
    },
    handleCancel() {
      this.editMode = false;
      this.selectedDate = new Date(this.currentReport.exam_date)
        .toISOString()
        .substr(0, 10);
    },
  },
};
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.icon-container {
  display: flex;
  align-items: center;
  padding: 10px;
}
</style>
